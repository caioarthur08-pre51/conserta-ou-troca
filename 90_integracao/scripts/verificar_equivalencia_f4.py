"""Compara, caso a caso, o modelo Python e o cálculo JavaScript do MVP."""

from __future__ import annotations

import csv
import json
import subprocess
import sys
from decimal import Decimal
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MODELO_DIR = ROOT / "01_modelagem_lais"
CSV_PATH = MODELO_DIR / "casos.csv"
NODE_SCRIPT = Path(__file__).with_name("calcular_resultados_app.mjs")
DEFAULT_OUTPUT = ROOT / "90_integracao" / "evidencias_f4" / "equivalencia_modelo_mvp.json"
TOLERANCIA = Decimal("0.000000001")

sys.path.insert(0, str(MODELO_DIR))
from modelo import calcular  # noqa: E402


def decimal(value: object) -> Decimal:
    return Decimal(str(value))


def main() -> int:
    output = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_OUTPUT
    with CSV_PATH.open(encoding="utf-8", newline="") as stream:
        cases = list(csv.DictReader(stream))

    completed = subprocess.run(
        ["node", str(NODE_SCRIPT)],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    app_by_id = {item["caso_id"]: item for item in json.loads(completed.stdout)}

    fields = (
        "custo_liquido_reparar",
        "custo_anual_reparar",
        "custo_liquido_trocar",
        "custo_anual_trocar",
        "diferenca_anual",
    )
    rows = []
    all_ok = True

    for case in cases:
        reference = calcular(
            custo_reparo=case["custo_reparo"],
            manutencao_adicional=case["manutencao_adicional"],
            residual_reparado=case["residual_reparado"],
            vida_adicional_anos=case["vida_adicional_anos"],
            preco_substituto=case["preco_substituto"],
            custos_acessorios=case["custos_acessorios"],
            valor_venda_atual=case["valor_venda_atual"],
            residual_substituto=case["residual_substituto"],
            vida_substituto_anos=case["vida_substituto_anos"],
        )
        app = app_by_id.get(case["caso_id"])
        problems = []
        if app is None:
            problems.append("caso ausente no MVP")
        else:
            for field in fields:
                expected = getattr(reference, field)
                received = decimal(app[field])
                if expected is None or abs(expected - received) > TOLERANCIA:
                    problems.append(
                        f"{field}: modelo={expected!s}; mvp={received!s}"
                    )
            if reference.resultado != app["decisao"]:
                problems.append(
                    f"resultado: modelo={reference.resultado}; mvp={app['decisao']}"
                )

        ok = not problems
        all_ok = all_ok and ok
        rows.append(
            {
                "caso_id": case["caso_id"],
                "resultado_modelo": reference.resultado,
                "resultado_mvp": None if app is None else app["decisao"],
                "equivalente": ok,
                "problemas": problems,
            }
        )

    report = {
        "fase": 4,
        "gate": "F4 EQUIVALÊNCIA CONFIRMADA",
        "fontes": {
            "csv": "01_modelagem_lais/casos.csv",
            "modelo": "01_modelagem_lais/modelo.py",
            "mvp": "02_produto_guilherme/app/js/calculos.js",
        },
        "tolerancia": str(TOLERANCIA),
        "casos": rows,
        "resumo": {
            "total": len(rows),
            "equivalentes": sum(item["equivalente"] for item in rows),
            "aprovado": all_ok and len(rows) == 8,
        },
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"Equivalência: {report['resumo']['equivalentes']}/{report['resumo']['total']} casos. "
        f"Relatório: {output}"
    )
    return 0 if report["resumo"]["aprovado"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

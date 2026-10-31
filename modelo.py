"""Cálculo de referência da Fase 1; não contém nem gera os oito casos."""
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation
from typing import Optional

CENT = Decimal("0.01")
ZERO = Decimal("0")

# Contrato canônico A:R do Planejamento v1.3. Campos derivados não pertencem aqui.
CAMPOS_CANONICOS = (
    "caso_id", "tipo_dispositivo", "modelo_ficticio", "custo_reparo",
    "manutencao_adicional", "residual_reparado", "vida_adicional_anos",
    "garantia_reparo_meses", "preco_substituto", "custos_acessorios",
    "valor_venda_atual", "residual_substituto", "vida_substituto_anos",
    "garantia_substituto_meses", "risco_reparo", "necessidade_usuario",
    "impacto_ambiental", "observacao",
)
CATEGORIAS_CANONICAS = {
    "tipo_dispositivo": frozenset(("Celular", "Notebook")),
    "risco_reparo": frozenset(("Baixo", "Médio", "Alto")),
    "necessidade_usuario": frozenset(("Essencial", "Importante", "Adiável")),
    "impacto_ambiental": frozenset((
        "Reparo favorece reuso", "Equilibrado",
        "Troca requer descarte responsável",
    )),
}
# Domínios da tabela longa e das saídas; estes campos não são colunas A:R.
CATEGORIAS_DERIVADAS = {
    "cenario": frozenset(("Reparar", "Trocar")),
    "resultado": frozenset(("Reparar", "Trocar", "Empate técnico", "n.a.")),
}


def validar_contrato(cabecalhos, registro=None):
    """Valida a ordem A:R e, se fornecido, as categorias de um registro.

    Retorna uma lista de problemas; lista vazia significa contrato válido.
    """
    problems = []
    if tuple(cabecalhos) != CAMPOS_CANONICOS:
        problems.append("Cabeçalhos devem corresponder exatamente ao contrato A:R.")
    if registro is not None:
        if set(registro) != set(CAMPOS_CANONICOS):
            problems.append("Registro deve conter exatamente os 18 campos canônicos.")
        for field, allowed in CATEGORIAS_CANONICAS.items():
            if registro.get(field) not in allowed:
                problems.append(f"Categoria inválida em {field}: {registro.get(field)!r}.")
    return problems


def _number(value, *, allow_zero=True):
    """Converte entrada para Decimal; retorna None para entrada inválida."""
    if value is None or isinstance(value, bool):
        return None
    try:
        number = Decimal(str(value).strip())
    except (InvalidOperation, ValueError, AttributeError):
        return None
    if not number.is_finite() or number < ZERO or (not allow_zero and number <= ZERO):
        return None
    return number


@dataclass(frozen=True)
class Resultado:
    custo_liquido_reparar: Optional[Decimal]
    custo_anual_reparar: Optional[Decimal]
    custo_liquido_trocar: Optional[Decimal]
    custo_anual_trocar: Optional[Decimal]
    diferenca_anual: Optional[Decimal]
    resultado: str


def calcular(*, custo_reparo, manutencao_adicional, residual_reparado,
              vida_adicional_anos, preco_substituto, custos_acessorios,
              valor_venda_atual, residual_substituto, vida_substituto_anos):
    """Calcula custos anuais e classe de decisão para um caso.

    Entradas monetárias aceitam zero, mas não vazio, texto ou negativo.
    Vidas úteis devem ser estritamente positivas. Custos líquidos negativos
    são inconsistentes e retornam n.a. sem custos nem vencedor.
    """
    repair_inputs = [
        _number(custo_reparo), _number(manutencao_adicional),
        _number(residual_reparado), _number(vida_adicional_anos, allow_zero=False),
    ]
    replace_inputs = [
        _number(preco_substituto), _number(custos_acessorios),
        _number(valor_venda_atual), _number(residual_substituto),
        _number(vida_substituto_anos, allow_zero=False),
    ]
    if any(value is None for value in repair_inputs + replace_inputs):
        return Resultado(None, None, None, None, None, "n.a.")

    repair, maintenance, repaired_residual, repair_life = repair_inputs
    replacement_price, accessories, sale, replacement_residual, replacement_life = replace_inputs
    net_repair = repair + maintenance - repaired_residual
    net_replace = replacement_price + accessories - sale - replacement_residual
    if net_repair < ZERO or net_replace < ZERO:
        return Resultado(None, None, None, None, None, "n.a.")

    annual_repair = net_repair / repair_life
    annual_replace = net_replace / replacement_life
    difference = annual_repair - annual_replace
    if abs(difference) < CENT:
        decision = "Empate técnico"
    elif difference < ZERO:
        decision = "Reparar"
    else:
        decision = "Trocar"
    return Resultado(net_repair, annual_repair, net_replace, annual_replace, difference, decision)


def exibir_reais(valor):
    """Formata para a apresentação (duas casas); nunca usar no cálculo."""
    return "n.a." if valor is None else f"R$ {valor:.2f}"

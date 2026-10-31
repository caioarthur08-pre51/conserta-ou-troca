"""Confere os oito casos publicados contra o contrato da Fase 1."""

import csv
import unittest
from collections import Counter
from decimal import Decimal
from pathlib import Path

from modelo import CAMPOS_CANONICOS, calcular, validar_contrato


CSV_CASOS = Path(__file__).with_name("casos.csv")
MONETARIOS = (
    "custo_reparo", "manutencao_adicional", "residual_reparado",
    "preco_substituto", "custos_acessorios", "valor_venda_atual",
    "residual_substituto",
)
VIDAS = ("vida_adicional_anos", "vida_substituto_anos")
GARANTIAS = ("garantia_reparo_meses", "garantia_substituto_meses")


class TestCasosPublicados(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with CSV_CASOS.open(encoding="utf-8", newline="") as arquivo:
            leitor = csv.DictReader(arquivo)
            cls.cabecalho = leitor.fieldnames
            cls.casos = list(leitor)

    def test_cabecalho_ids_e_tipos(self):
        self.assertEqual(tuple(self.cabecalho), CAMPOS_CANONICOS)
        self.assertEqual(len(self.casos), 8)
        self.assertEqual(
            [caso["caso_id"] for caso in self.casos],
            [f"C{numero:02d}" for numero in range(1, 9)],
        )
        self.assertEqual(
            Counter(caso["tipo_dispositivo"] for caso in self.casos),
            Counter({"Celular": 4, "Notebook": 4}),
        )

    def test_entradas_categorias_e_calculos(self):
        for caso in self.casos:
            with self.subTest(caso=caso["caso_id"]):
                self.assertEqual(validar_contrato(self.cabecalho, caso), [])
                self.assertTrue(all(caso[campo].strip() for campo in CAMPOS_CANONICOS))
                for campo in MONETARIOS:
                    self.assertGreaterEqual(Decimal(caso[campo]), 0)
                for campo in VIDAS:
                    self.assertGreater(Decimal(caso[campo]), 0)
                for campo in GARANTIAS:
                    self.assertGreaterEqual(int(caso[campo]), 0)
                    self.assertEqual(str(int(caso[campo])), caso[campo])
                resultado = calcular(**{
                    campo: caso[campo] for campo in (*MONETARIOS, *VIDAS)
                })
                self.assertNotEqual(resultado.resultado, "n.a.")

    def test_resultados_manuais_c01_e_c03(self):
        casos = {caso["caso_id"]: caso for caso in self.casos}
        for id_, reparar, trocar, vencedor in (
            ("C01", "253.33", "315.00", "Reparar"),
            ("C03", "370.00", "282.86", "Trocar"),
        ):
            caso = casos[id_]
            resultado = calcular(**{
                campo: caso[campo] for campo in (*MONETARIOS, *VIDAS)
            })
            self.assertEqual(
                resultado.custo_anual_reparar.quantize(Decimal("0.01")),
                Decimal(reparar),
            )
            self.assertEqual(
                resultado.custo_anual_trocar.quantize(Decimal("0.01")),
                Decimal(trocar),
            )
            self.assertEqual(resultado.resultado, vencedor)


if __name__ == "__main__":
    unittest.main()

"""Testes de contrato; fixture de C01 reproduz apenas números explícitos do guia."""
import unittest
from decimal import Decimal

from modelo import (
    CAMPOS_CANONICOS, CATEGORIAS_CANONICAS, CATEGORIAS_DERIVADAS,
    calcular, validar_contrato,
)


class TestContratoCanonico(unittest.TestCase):
    def test_cabecalhos_exatos_em_ordem_a_r(self):
        self.assertEqual(validar_contrato(CAMPOS_CANONICOS), [])
        self.assertEqual(len(CAMPOS_CANONICOS), 18)
        self.assertEqual(CAMPOS_CANONICOS[14:], (
            "risco_reparo", "necessidade_usuario", "impacto_ambiental", "observacao"
        ))

    def test_rejeita_cabecalho_fora_de_ordem_ou_nome_incompativel(self):
        headers = list(CAMPOS_CANONICOS)
        headers[15] = "necessidade"
        self.assertTrue(validar_contrato(headers))

    def test_aceita_categorias_exatas_do_contrato(self):
        registro = {field: "" for field in CAMPOS_CANONICOS}
        registro.update({
            "tipo_dispositivo": "Celular",
            "risco_reparo": "Médio",
            "necessidade_usuario": "Adiável",
            "impacto_ambiental": "Reparo favorece reuso",
        })
        self.assertEqual(validar_contrato(CAMPOS_CANONICOS, registro), [])
        self.assertEqual(len(CATEGORIAS_CANONICAS), 4)
        self.assertEqual(CATEGORIAS_DERIVADAS["cenario"], frozenset(("Reparar", "Trocar")))
        self.assertEqual(CATEGORIAS_DERIVADAS["resultado"], frozenset((
            "Reparar", "Trocar", "Empate técnico", "n.a."
        )))

    def test_rejeita_categoria_incompativel_sem_normalizar(self):
        registro = {field: "" for field in CAMPOS_CANONICOS}
        registro.update({
            "tipo_dispositivo": "celular",
            "risco_reparo": "Medio",
            "necessidade_usuario": "Alta",
            "impacto_ambiental": "Baixo",
        })
        problems = validar_contrato(CAMPOS_CANONICOS, registro)
        self.assertEqual(len(problems), 4)


class TestModeloFinanceiro(unittest.TestCase):
    def test_c01_exemplo_do_guia(self):
        r = calcular(
            custo_reparo=420, manutencao_adicional=80, residual_reparado=120,
            vida_adicional_anos="1.5", preco_substituto=1800,
            custos_acessorios=90, valor_venda_atual=180,
            residual_substituto=450, vida_substituto_anos=4,
        )
        self.assertEqual(r.custo_liquido_reparar, Decimal("380"))
        self.assertEqual(r.custo_anual_reparar.quantize(Decimal("0.01")), Decimal("253.33"))
        self.assertEqual(r.custo_liquido_trocar, Decimal("1260"))
        self.assertEqual(r.custo_anual_trocar.quantize(Decimal("0.01")), Decimal("315.00"))
        self.assertEqual(r.resultado, "Reparar")

    def test_empate_estrito_abaixo_de_um_centavo(self):
        # Anual reparar = 1,005; anual trocar = 1,000; diferença = 0,005.
        r = calcular(
            custo_reparo="1.005", manutencao_adicional=0, residual_reparado=0,
            vida_adicional_anos=1, preco_substituto=1,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.resultado, "Empate técnico")

    def test_limite_exato_de_um_centavo_nao_e_empate(self):
        r = calcular(
            custo_reparo="1.01", manutencao_adicional=0, residual_reparado=0,
            vida_adicional_anos=1, preco_substituto=1,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.resultado, "Trocar")

    def test_vida_util_zero_retorna_na(self):
        r = calcular(
            custo_reparo=10, manutencao_adicional=0, residual_reparado=0,
            vida_adicional_anos=0, preco_substituto=20,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.resultado, "n.a.")
        self.assertIsNone(r.custo_anual_reparar)

    def test_entrada_monetaria_negativa_retorna_na(self):
        r = calcular(
            custo_reparo=-1, manutencao_adicional=0, residual_reparado=0,
            vida_adicional_anos=1, preco_substituto=20,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.resultado, "n.a.")

    def test_custo_liquido_negativo_retorna_na(self):
        r = calcular(
            custo_reparo=10, manutencao_adicional=0, residual_reparado=11,
            vida_adicional_anos=1, preco_substituto=20,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.resultado, "n.a.")
        self.assertIsNone(r.custo_liquido_reparar)

    def test_valor_zero_legitimo_e_aceito(self):
        r = calcular(
            custo_reparo=0, manutencao_adicional=0, residual_reparado=0,
            vida_adicional_anos=1, preco_substituto=20,
            custos_acessorios=0, valor_venda_atual=0,
            residual_substituto=0, vida_substituto_anos=1,
        )
        self.assertEqual(r.custo_anual_reparar, Decimal("0"))
        self.assertEqual(r.resultado, "Reparar")


if __name__ == "__main__":
    unittest.main()

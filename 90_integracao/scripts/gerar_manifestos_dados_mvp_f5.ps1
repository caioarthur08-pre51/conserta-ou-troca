param(
    [string]$RaizFinal = (Join-Path $PSScriptRoot '..\..\.build\final_f5')
)

$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath($RaizFinal)
$repo = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$allowed = [System.IO.Path]::GetFullPath((Join-Path $repo '.build\final_f5'))
if (-not $root.StartsWith($allowed, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "A raiz final precisa permanecer dentro de $allowed"
}

$specs = @(
    [pscustomobject]@{
        pasta = '01_lais'
        saida = 'manifesto_dados_v1.0.0.json'
        dominio = 'Modelagem Financeira e Inteligência de Dados — Laís Eulálio'
    },
    [pscustomobject]@{
        pasta = '02_guilherme'
        saida = 'manifesto_mvp_v1.0.0.json'
        dominio = 'Engenharia do Comparador Local — Guilherme Almeida'
    }
)

foreach ($spec in $specs) {
    $folder = Join-Path $root $spec.pasta
    if (-not (Test-Path -LiteralPath $folder -PathType Container)) {
        throw "Pasta final ausente: $folder"
    }
    $files = Get-ChildItem -LiteralPath $folder -File |
        Where-Object Name -ne $spec.saida |
        Sort-Object Name |
        ForEach-Object {
            [pscustomobject]@{
                arquivo = $_.Name
                tamanho_bytes = $_.Length
                sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
            }
        }
    $manifest = [pscustomobject]@{
        versao_pacote = '1.0.0'
        congelamento_tecnico = '2026-11-09'
        dominio_funcional = $spec.dominio
        executor_tecnico = 'Codex sob coordenação de Caio Rocha'
        algoritmo = 'SHA-256'
        arquivos = @($files)
        limite = 'Não declara teste físico ou humano sem evidência.'
    }
    $path = Join-Path $folder $spec.saida
    $manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $path -Encoding utf8
    $manifest
}

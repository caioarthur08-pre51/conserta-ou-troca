param(
    [string]$FinalRoot = ".build/final_f5",
    [string]$OutputDirectory = ".build/final_f5/00_caio"
)

$ErrorActionPreference = "Stop"

$resolvedRoot = (Resolve-Path -LiteralPath $FinalRoot).Path
if (-not (Test-Path -LiteralPath $OutputDirectory)) {
    New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
}
$resolvedOutput = (Resolve-Path -LiteralPath $OutputDirectory).Path

$excludedPatterns = @(
    "\\_qa\\",
    "\\qa\\",
    "\\renders\\",
    "\\rendered\\",
    "\.inspect\.ndjson$",
    "manifesto_artefatos_f5\.(csv|json)$"
)

$rows = foreach ($file in Get-ChildItem -LiteralPath $resolvedRoot -Recurse -File) {
    $relative = $file.FullName.Substring($resolvedRoot.Length).TrimStart([char[]]'\/')
    $skip = $false
    foreach ($pattern in $excludedPatterns) {
        if ($relative -match $pattern) {
            $skip = $true
            break
        }
    }
    if ($skip) { continue }

    $segments = $relative -split "[\\/]"
    $roleFolder = if ($segments.Count -gt 1) { $segments[0] } else { "00_caio" }
    $role = switch -Regex ($roleFolder) {
        "01_lais" { "Laís Eulálio"; break }
        "02_guilherme" { "Guilherme Almeida"; break }
        "03_leticia" { "Letícia Costa"; break }
        "04_larissa" { "Larissa Costa"; break }
        default { "Caio Rocha" }
    }

    $destination = switch -Regex ($file.Extension.ToLowerInvariant()) {
        "^\.zip$" { "02_entrega_final e 03_contingencia"; break }
        "^\.pdf$" { "02_entrega_final e 03_contingencia"; break }
        "^\.(odt|odp|ods)$" { "01_editaveis e 02_entrega_final"; break }
        default { "02_entrega_final" }
    }

    [pscustomobject]@{
        artefato = $file.Name
        cargo_responsavel = $role
        versao = "1.0.0"
        data_congelamento = "2026-11-08"
        caminho_local = $relative.Replace("\\", "/")
        tamanho_bytes = $file.Length
        sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
        destino_planejado = $destination
        link_drive = "A preencher após upload"
        situacao = "Validado localmente; publicação pendente"
    }
}

$ordered = $rows | Sort-Object cargo_responsavel, artefato
$csvPath = Join-Path $resolvedOutput "manifesto_artefatos_f5.csv"
$jsonPath = Join-Path $resolvedOutput "manifesto_artefatos_f5.json"
$ordered | Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding utf8
$ordered | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $jsonPath -Encoding utf8

[pscustomobject]@{
    total = @($ordered).Count
    csv = $csvPath
    json = $jsonPath
} | ConvertTo-Json -Depth 3

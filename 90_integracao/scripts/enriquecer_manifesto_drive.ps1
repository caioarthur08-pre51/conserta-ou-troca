param(
    [string]$ManifestJson = ".build/final_f5/00_caio/manifesto_artefatos_f5.json",
    [string]$ManifestCsv = ".build/final_f5/00_caio/manifesto_artefatos_f5.csv",
    [Parameter(Mandatory = $true)]
    [string]$LinksJson
)

$ErrorActionPreference = "Stop"

$rows = @(Get-Content -LiteralPath $ManifestJson -Raw | ConvertFrom-Json)
$links = @(Get-Content -LiteralPath $LinksJson -Raw | ConvertFrom-Json)
$byPath = @{}

foreach ($item in $links) {
    $normalized = ([string]$item.caminho_local).Replace('\', '/')
    $byPath[$normalized] = $item
}

foreach ($row in $rows) {
    $normalized = ([string]$row.caminho_local).Replace('\', '/')
    if ($byPath.ContainsKey($normalized)) {
        $link = $byPath[$normalized]
        $row.link_drive = [string]$link.link_drive
        $row.situacao = "Publicado no Drive; validado localmente"
    }
}

$rows | Sort-Object cargo_responsavel, artefato |
    ConvertTo-Json -Depth 6 |
    Set-Content -LiteralPath $ManifestJson -Encoding utf8

$rows | Sort-Object cargo_responsavel, artefato |
    Export-Csv -LiteralPath $ManifestCsv -NoTypeInformation -Encoding utf8

[pscustomobject]@{
    total = $rows.Count
    publicados = @($rows | Where-Object { $_.link_drive -ne "A preencher após upload" }).Count
    pendentes = @($rows | Where-Object { $_.link_drive -eq "A preencher após upload" }).Count
} | ConvertTo-Json

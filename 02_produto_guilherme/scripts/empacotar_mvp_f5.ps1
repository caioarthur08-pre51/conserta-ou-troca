param(
    [string]$Versao = '1.0.0',
    [string]$Destino = (Join-Path $PSScriptRoot '..\..\.build\pacote_f5')
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$app = (Resolve-Path (Join-Path $PSScriptRoot '..\app')).Path
$buildRoot = [System.IO.Path]::GetFullPath($Destino)
$allowedRoot = [System.IO.Path]::GetFullPath((Join-Path $root '.build'))

if (-not $buildRoot.StartsWith($allowedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "O destino precisa permanecer dentro de $allowedRoot"
}
if (Test-Path -LiteralPath $buildRoot) {
    Remove-Item -LiteralPath $buildRoot -Recurse -Force
}
New-Item -ItemType Directory -Path $buildRoot -Force | Out-Null

$packageName = "Conserta-ou-Troca_MVP_v$Versao"
$folder = Join-Path $buildRoot $packageName
Copy-Item -LiteralPath $app -Destination $folder -Recurse
$zip = Join-Path $buildRoot ($packageName + '.zip')
Compress-Archive -LiteralPath $folder -DestinationPath $zip -CompressionLevel Optimal
$file = Get-Item -LiteralPath $zip
$hash = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash
$manifest = [pscustomobject]@{
    versao = $Versao
    arquivo = $file.Name
    tamanho_bytes = $file.Length
    sha256 = $hash
    entrada = 'Extrair o ZIP e abrir index.html em navegador moderno, sem internet.'
    formatos = @('HTML', 'CSS', 'JavaScript', 'CSV', 'Markdown')
}
$manifestPath = Join-Path $buildRoot ($packageName + '_manifesto.json')
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding utf8
$manifest | ConvertTo-Json -Depth 4

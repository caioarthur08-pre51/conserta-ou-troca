param(
    [string]$Saida = (Join-Path $PSScriptRoot '..\..\90_integracao\evidencias_f4\navegadores_mvp.json')
)

$ErrorActionPreference = 'Stop'
$app = (Resolve-Path (Join-Path $PSScriptRoot '..\app\index.html')).Path
$url = ([System.Uri]::new($app)).AbsoluteUri
$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("conserta-troca-f4-" + [guid]::NewGuid().ToString('N'))
$sizes = @(
    [pscustomobject]@{ nome = 'celular'; largura = 390; altura = 844 },
    [pscustomobject]@{ nome = 'desktop'; largura = 1280; altura = 720 }
)
$browsers = @(
    [pscustomobject]@{ nome = 'Chrome'; tipo = 'chromium'; caminho = 'C:\Program Files\Google\Chrome\Application\chrome.exe' },
    [pscustomobject]@{ nome = 'Edge'; tipo = 'chromium'; caminho = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' },
    [pscustomobject]@{ nome = 'Firefox'; tipo = 'firefox'; caminho = 'C:\Program Files\Mozilla Firefox\firefox.exe' }
)
$results = [System.Collections.Generic.List[object]]::new()

New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null
try {
    foreach ($browser in $browsers) {
        foreach ($size in $sizes) {
            $id = ($browser.nome + '-' + $size.nome).ToLowerInvariant()
            $profile = Join-Path $tempRoot ("perfil-" + $id)
            New-Item -ItemType Directory -Path $profile -Force | Out-Null
            $exitCode = 1
            $loaded = $false
            $detail = ''

            if (-not (Test-Path -LiteralPath $browser.caminho)) {
                $detail = 'Executável não encontrado.'
            }
            elseif ($browser.tipo -eq 'chromium') {
                $args = @(
                    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
                    "--user-data-dir=$profile", "--window-size=$($size.largura),$($size.altura)",
                    '--virtual-time-budget=2000', '--dump-dom', $url
                )
                $dom = (& $browser.caminho @args 2>&1 | Out-String)
                $exitCode = $LASTEXITCODE
                $options = ([regex]::Matches($dom, '<option')).Count
                $loaded = $exitCode -eq 0 -and $options -eq 8 -and
                    $dom.Contains('C01') -and $dom.Contains('Orion Mini') -and
                    $dom.Contains('Revise as premissas e pressione Calcular.')
                $detail = "DOM dinâmico; opções=$options; estado inicial=$($dom.Contains('Orion Mini'))."
            }
            else {
                $capture = Join-Path $tempRoot ("$id.png")
                $log = (& $browser.caminho -headless -profile $profile -width $size.largura -height $size.altura -screenshot $capture $url 2>&1 | Out-String)
                $exitCode = $LASTEXITCODE
                $loaded = $exitCode -eq 0 -and (Test-Path -LiteralPath $capture) -and
                    (Get-Item -LiteralPath $capture).Length -gt 1000
                $detail = if ($loaded) { 'Captura headless gerada e página carregada.' } else { $log.Trim() }
            }

            $results.Add([pscustomobject]@{
                navegador = $browser.nome
                largura = $size.largura
                altura = $size.altura
                modo = 'file:// offline'
                aprovado = $loaded
                codigo_saida = $exitCode
                detalhe = $detail
            })
        }
    }
}
finally {
    $resolvedTemp = [System.IO.Path]::GetFullPath($tempRoot)
    $systemTemp = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
    if ($resolvedTemp.StartsWith($systemTemp, [System.StringComparison]::OrdinalIgnoreCase) -and
        $resolvedTemp -ne $systemTemp -and (Test-Path -LiteralPath $resolvedTemp)) {
        Remove-Item -LiteralPath $resolvedTemp -Recurse -Force
    }
}

$report = [pscustomobject]@{
    fase = 4
    gate = 'RESULTADOS MVP LIBERADOS'
    arquivo = '02_produto_guilherme/app/index.html'
    execucao_offline = $true
    testes = $results
    resumo = [pscustomobject]@{
        total = $results.Count
        aprovados = @($results | Where-Object aprovado).Count
        aprovado = @($results | Where-Object { -not $_.aprovado }).Count -eq 0
    }
}

$output = [System.IO.Path]::GetFullPath($Saida)
New-Item -ItemType Directory -Path (Split-Path -Parent $output) -Force | Out-Null
$report | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $output -Encoding utf8
$report | ConvertTo-Json -Depth 6
if (-not $report.resumo.aprovado) { exit 1 }

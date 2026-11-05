param(
    [string]$Roteiro = (Join-Path $PSScriptRoot 'roteiro_microoficina.md')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech

$sintetizador = [System.Speech.Synthesis.SpeechSynthesizer]::new()
$voz = $sintetizador.GetInstalledVoices() |
    Where-Object { $_.VoiceInfo.Culture.Name -eq 'pt-BR' } |
    Select-Object -First 1
if (-not $voz) { throw 'Nenhuma voz pt-BR instalada para a medição.' }
$sintetizador.SelectVoice($voz.VoiceInfo.Name)
$sintetizador.Rate = 0

$linhas = Get-Content -LiteralPath $Roteiro -Encoding UTF8
$segmentos = [System.Collections.Generic.List[object]]::new()
$titulo = ''

for ($i = 0; $i -lt $linhas.Count; $i++) {
    if ($linhas[$i] -match '^#{2,3}\s+(\d{1,2}:\d{2}–\d{1,2}:\d{2})') {
        $titulo = $Matches[1]
    }
    if ($linhas[$i] -ne '**Fala principal:**') { continue }

    $frases = [System.Collections.Generic.List[string]]::new()
    $j = $i + 1
    while ($j -lt $linhas.Count -and $linhas[$j].Trim() -eq '') { $j++ }
    while ($j -lt $linhas.Count -and $linhas[$j] -match '^>\s?(.*)$') {
        $frases.Add($Matches[1])
        $j++
    }
    if ($frases.Count -eq 0) { throw "Fala sem texto em $titulo" }
    $fala = ($frases -join ' ')
    $fala = $fala -replace '\[Opcional, 20 segundos\]\s*', ''
    $fala = $fala -replace '\[erro_vazio\]', 'Preencha este campo para calcular.'
    $fala = $fala -replace '\*\*', ''
    $segmentos.Add([pscustomobject]@{ intervalo = $titulo; fala = $fala })
}

function Get-DuracaoWave([byte[]]$bytes) {
    $leitor = [System.IO.BinaryReader]::new([System.IO.MemoryStream]::new($bytes))
    try {
        if ([System.Text.Encoding]::ASCII.GetString($leitor.ReadBytes(4)) -ne 'RIFF') {
            throw 'Áudio gerado não tem cabeçalho RIFF.'
        }
        [void]$leitor.ReadUInt32()
        if ([System.Text.Encoding]::ASCII.GetString($leitor.ReadBytes(4)) -ne 'WAVE') {
            throw 'Áudio gerado não é WAVE.'
        }
        $byteRate = 0
        $dataBytes = 0
        while ($leitor.BaseStream.Position -lt $leitor.BaseStream.Length) {
            $id = [System.Text.Encoding]::ASCII.GetString($leitor.ReadBytes(4))
            $tamanho = $leitor.ReadUInt32()
            $inicio = $leitor.BaseStream.Position
            if ($id -eq 'fmt ') {
                [void]$leitor.ReadBytes(8)
                $byteRate = $leitor.ReadUInt32()
            }
            if ($id -eq 'data') { $dataBytes = $tamanho }
            $leitor.BaseStream.Position = $inicio + $tamanho + ($tamanho % 2)
        }
        if ($byteRate -le 0 -or $dataBytes -le 0) { throw 'Áudio sem taxa ou dados.' }
        return $dataBytes / $byteRate
    }
    finally { $leitor.Dispose() }
}

$resultado = [System.Collections.Generic.List[object]]::new()
foreach ($segmento in $segmentos) {
    $fluxo = [System.IO.MemoryStream]::new()
    try {
        $sintetizador.SetOutputToWaveStream($fluxo)
        $sintetizador.Speak($segmento.fala)
        $sintetizador.SetOutputToNull()
        $segundos = Get-DuracaoWave($fluxo.ToArray())
        $resultado.Add([pscustomobject]@{
            intervalo = $segmento.intervalo
            segundos_de_fala = [math]::Round($segundos, 2)
            palavras = ($segmento.fala -split '\s+' | Where-Object { $_ }).Count
        })
    }
    finally { $fluxo.Dispose() }
}
$sintetizador.Dispose()

[pscustomobject]@{
    metodo = 'System.Speech pt-BR, voz instalada, velocidade normal (Rate=0); duração do WAV sintetizado'
    voz = $voz.VoiceInfo.Name
    segmentos = $resultado
    total_segundos_de_fala = [math]::Round(($resultado | Measure-Object -Property segundos_de_fala -Sum).Sum, 2)
} | ConvertTo-Json -Depth 5

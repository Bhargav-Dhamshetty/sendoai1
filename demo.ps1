# Quick Demo - Test the /generate endpoint
Write-Host "`n🚀 SENDORA AI - Quick Demo`n" -ForegroundColor Cyan

$prompt = Read-Host "Enter your prompt (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($prompt)) {
    $prompt = "Write a haiku about artificial intelligence"
}

Write-Host "`n⏳ Generating response..." -ForegroundColor Yellow

try {
    $body = @{ prompt = $prompt } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3000/generate" -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "`n✅ SUCCESS!`n" -ForegroundColor Green
    Write-Host "📝 Response:" -ForegroundColor Cyan
    Write-Host $response.response -ForegroundColor White
    Write-Host "`n🔑 Key Used: $($response.keyUsed)" -ForegroundColor Yellow
    Write-Host "⏱️  Duration: $($response.duration)" -ForegroundColor Yellow
    
} catch {
    Write-Host "`n❌ ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`nMake sure the server is running! Run START-SERVER.bat first.`n" -ForegroundColor Yellow
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

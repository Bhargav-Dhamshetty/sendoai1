# ===================================
# SENDORA AI - STATUS CHECKER
# ===================================

Write-Host "`n╔════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   SENDORA AI - STATUS CHECK       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if server is running
Write-Host "🔍 Checking server status..." -ForegroundColor Yellow

try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -TimeoutSec 2
    
    Write-Host "`n✅ SERVER IS RUNNING!`n" -ForegroundColor Green
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "📊 SERVER STATUS" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "Status:          $($health.status.ToUpper())" -ForegroundColor $(if($health.status -eq "healthy"){"Green"}else{"Red"})
    Write-Host "Model:           $($health.model)"
    Write-Host "Available Keys:  $($health.keysAvailable) / $($health.keyStats.totalKeys)"
    Write-Host "Current Key:     $($health.keyStats.currentKey)"
    
    if ($health.keyStats.rateLimitedKeys.Count -gt 0) {
        Write-Host "`n⚠️  Rate Limited Keys: $($health.keyStats.rateLimitedKeys -join ', ')" -ForegroundColor Yellow
    } else {
        Write-Host "`n✅ No rate-limited keys" -ForegroundColor Green
    }
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "📡 ENDPOINTS AVAILABLE" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "POST   http://localhost:3000/generate      (AI Generation)"
    Write-Host "GET    http://localhost:3000/health        (Health Check)"
    Write-Host "GET    http://localhost:3000/stats         (Statistics)"
    Write-Host "POST   http://localhost:3000/test-email    (Test Email)"
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "🎯 QUICK ACTIONS" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "Test AI:         powershell .\demo.ps1"
    Write-Host "Run Tests:       RUN-TESTS.bat"
    Write-Host "View Stats:      Invoke-RestMethod http://localhost:3000/stats"
    
} catch {
    Write-Host "`n❌ SERVER IS NOT RUNNING!`n" -ForegroundColor Red
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "🚀 HOW TO START THE SERVER" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 1: Double-click START-SERVER.bat" -ForegroundColor White
    Write-Host "Option 2: Run 'npm start' in terminal" -ForegroundColor White
    Write-Host "Option 3: Run 'node server.js' in terminal" -ForegroundColor White
    Write-Host ""
    Write-Host "Keep the server window open after starting!`n"
}

Write-Host ""

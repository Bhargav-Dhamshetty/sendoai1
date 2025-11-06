Write-Host "`n" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ SENDORA AI - N8N SETUP VERIFICATION" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

# Check if files exist
Write-Host "📦 Checking files..." -ForegroundColor Yellow
$files = @(
    "Main_Outreach_Workflow.json",
    "Call_Analysis_Workflow.json",
    "Supabase_Schema.sql",
    "Retell_AI_Agent_Config.json",
    ".env.n8n",
    "SETUP_WITH_YOUR_CREDENTIALS.md"
)

$allFilesExist = $true
foreach ($file in $files) {
    if (Test-Path "n8n-workflows\$file") {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host "`n"

# Show credentials
Write-Host "🔑 Your Supabase Credentials:" -ForegroundColor Yellow
Write-Host "   URL: https://bmpteadatirqfaweykns.supabase.co" -ForegroundColor White
Write-Host "   Service Key: eyJhbGci...3GCs (configured)" -ForegroundColor Green
Write-Host "`n"

Write-Host "📧 Your Email (Brevo) Configuration:" -ForegroundColor Yellow
Write-Host "   Host: smtp-relay.brevo.com" -ForegroundColor White
Write-Host "   User: 9ab905001@smtp-brevo.com" -ForegroundColor White
Write-Host "   From: mechconect18@gmail.com" -ForegroundColor White
Write-Host "   To: godbhargav@gmail.com" -ForegroundColor Green
Write-Host "`n"

Write-Host "🚀 Your Gemini Server:" -ForegroundColor Yellow
Write-Host "   URL: http://localhost:3000" -ForegroundColor White
Write-Host "   Status: " -NoNewline
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ RUNNING" -ForegroundColor Green
} catch {
    Write-Host "❌ NOT RUNNING (Start with: node server.js)" -ForegroundColor Red
}
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📋 NEXT STEPS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "1️⃣  Run SQL Schema in Supabase:" -ForegroundColor White
Write-Host "    → Open: https://bmpteadatirqfaweykns.supabase.co" -ForegroundColor Cyan
Write-Host "    → SQL Editor → Paste Supabase_Schema.sql → Run" -ForegroundColor Gray
Write-Host "`n"

Write-Host "2️⃣  Setup n8n:" -ForegroundColor White
Write-Host "    → Sign up: https://n8n.io" -ForegroundColor Cyan
Write-Host "    → Import Main_Outreach_Workflow.json" -ForegroundColor Gray
Write-Host "    → Import Call_Analysis_Workflow.json" -ForegroundColor Gray
Write-Host "`n"

Write-Host "3️⃣  Add Credentials in n8n:" -ForegroundColor White
Write-Host "    → Supabase: bmpteadatirqfaweykns.supabase.co" -ForegroundColor Cyan
Write-Host "    → SMTP: smtp-relay.brevo.com" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "4️⃣  Test Workflow:" -ForegroundColor White
Write-Host "    → Start server: node server.js" -ForegroundColor Cyan
Write-Host "    → Send test POST to webhook" -ForegroundColor Gray
Write-Host "    → Check Supabase tables" -ForegroundColor Gray
Write-Host "    → Check email inbox" -ForegroundColor Gray
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📖 FULL GUIDE" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "   Open: n8n-workflows\SETUP_WITH_YOUR_CREDENTIALS.md" -ForegroundColor Green
Write-Host "`n"
Write-Host "   This has your ACTUAL credentials pre-filled!" -ForegroundColor Yellow
Write-Host "   Just copy-paste and go! 🚀" -ForegroundColor Green
Write-Host "`n"

if (-not $allFilesExist) {
    Write-Host "⚠️  WARNING: Some files are missing!" -ForegroundColor Red
    Write-Host "   Please regenerate the n8n workflows." -ForegroundColor Yellow
    Write-Host "`n"
}

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

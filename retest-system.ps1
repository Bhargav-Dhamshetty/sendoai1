# ═══════════════════════════════════════════════════════════
# SENDORA AI - QUICK RETEST SCRIPT
# ═══════════════════════════════════════════════════════════
# Run this AFTER creating Supabase tables
# ═══════════════════════════════════════════════════════════

Write-Host "`n════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔄 RETESTING SENDORA AI SYSTEM" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Test 1: Main Outreach Workflow
Write-Host "📊 Test 1: Main Outreach Workflow..." -ForegroundColor Yellow
$body1 = @{
    linkedinUrl = "https://www.linkedin.com/in/satya-nadella"
    phoneNumber = "+15551234567"
} | ConvertTo-Json

try {
    $response1 = Invoke-WebRequest -Uri "https://ram123499.app.n8n.cloud/webhook/outreach-trigger" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body1 `
        -UseBasicParsing
    
    if ($response1.StatusCode -eq 200) {
        Write-Host "✅ Main Outreach Workflow - SUCCESS (200 OK)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Main Outreach Workflow - FAILED: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# Test 2: Call Analysis Workflow
Write-Host "`n📞 Test 2: Call Analysis Workflow..." -ForegroundColor Yellow
$body2 = @{
    call_id = "test-call-" + (Get-Date).Ticks
    request_id = "test-req-" + (Get-Date).Ticks
    call_status = "completed"
    call_type = "outbound"
    duration = 245
    transcript = "This is a test call. The prospect showed high interest in our product and asked about pricing. We discussed the enterprise plan."
    recording_url = "https://storage.retellai.com/test-recording.mp3"
    to_number = "+15551234567"
    metadata = @{
        prospect_name = "Test Prospect"
        company_name = "Test Company"
        email = "godbhargav@gmail.com"
    }
    timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json -Depth 10

try {
    $response2 = Invoke-WebRequest -Uri "https://ram123499.app.n8n.cloud/webhook/retell-webhook" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body2 `
        -UseBasicParsing
    
    if ($response2.StatusCode -eq 200) {
        Write-Host "✅ Call Analysis Workflow - SUCCESS (200 OK)" -ForegroundColor Green
        Write-Host "   📧 Check email: godbhargav@gmail.com for call report" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Call Analysis Workflow - FAILED: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# Test 3: Verify Supabase Data
Write-Host "`n🔍 Test 3: Checking Supabase Data..." -ForegroundColor Yellow
Write-Host "   Running comprehensive test script..." -ForegroundColor Gray

node test-complete-system.js

Write-Host "`n════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ RETEST COMPLETE!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "📋 Verification Checklist:" -ForegroundColor Yellow
Write-Host "  1. ✅ Check n8n execution history" -ForegroundColor White
Write-Host "     https://ram123499.app.n8n.cloud/workflows" -ForegroundColor Gray
Write-Host "`n  2. ✅ Check Supabase tables have data" -ForegroundColor White
Write-Host "     https://supabase.com/dashboard/project/bmpteadatirqfaweykns/editor" -ForegroundColor Gray
Write-Host "`n  3. ✅ Check email inbox: godbhargav@gmail.com" -ForegroundColor White
Write-Host "`n"

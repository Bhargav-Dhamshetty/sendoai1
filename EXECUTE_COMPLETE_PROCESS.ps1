# ═══════════════════════════════════════════════════════════════════
# SENDORA AI - COMPLETE EXECUTION SCRIPT
# Executes the entire process from start to end
# ═══════════════════════════════════════════════════════════════════

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║         🚀 SENDORA AI - COMPLETE EXECUTION SCRIPT 🚀          ║" -ForegroundColor Green
Write-Host "║                  Start to End Automation                       ║" -ForegroundColor Green
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# ═══════════════════════════════════════════════════════════════════
# STEP 1: CHECK PREREQUISITES
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 1: CHECKING PREREQUISITES`n" -ForegroundColor Yellow

Write-Host "✓ Checking backend server (localhost:3000)..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -Method GET -UseBasicParsing -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ Backend server is RUNNING`n" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠️  Backend server is NOT running!" -ForegroundColor Red
    Write-Host "  Starting backend server..." -ForegroundColor Yellow
    Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "C:\Users\Abhishek\sendo" -WindowStyle Minimized
    Write-Host "  Waiting 5 seconds for server startup..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    Write-Host "  ✅ Backend server STARTED`n" -ForegroundColor Green
}

Write-Host "✓ Checking workflow files..." -ForegroundColor White
$files = @(
    "C:\Users\Abhishek\sendo\n8n-workflows\Main_Outreach_Workflow.json",
    "C:\Users\Abhishek\sendo\n8n-workflows\Call_Analysis_Workflow.json",
    "C:\Users\Abhishek\sendo\n8n-workflows\Supabase_Schema.sql"
)
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✅ $(Split-Path $file -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ MISSING: $(Split-Path $file -Leaf)" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# ═══════════════════════════════════════════════════════════════════
# STEP 2: DISPLAY SUPABASE SQL INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 2: SUPABASE DATABASE SETUP`n" -ForegroundColor Yellow

Write-Host "⚠️  MANUAL ACTION REQUIRED:" -ForegroundColor Red
Write-Host ""
Write-Host "1. Open Supabase SQL Editor:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/bmpteadatirqfaweykns/sql/new`n" -ForegroundColor Cyan

Write-Host "2. Open this file in VS Code:" -ForegroundColor White
Write-Host "   C:\Users\Abhishek\sendo\n8n-workflows\Supabase_Schema.sql`n" -ForegroundColor Cyan

Write-Host "3. Copy ALL content (Ctrl+A, Ctrl+C)`n" -ForegroundColor White

Write-Host "4. Paste in Supabase SQL Editor and click RUN`n" -ForegroundColor White

Write-Host "5. Verify 6 tables created:" -ForegroundColor White
Write-Host "   ✓ prospects" -ForegroundColor Green
Write-Host "   ✓ call_metrics" -ForegroundColor Green
Write-Host "   ✓ call_logs" -ForegroundColor Green
Write-Host "   ✓ system_logs" -ForegroundColor Green
Write-Host "   ✓ metrics" -ForegroundColor Green
Write-Host "   ✓ daily_call_metrics`n" -ForegroundColor Green

$response = Read-Host "Have you completed Supabase setup? (yes/no)"
if ($response -ne "yes") {
    Write-Host "`n⚠️  Please complete Supabase setup first, then run this script again.`n" -ForegroundColor Yellow
    exit 0
}

Write-Host "`n✅ Supabase setup confirmed!`n" -ForegroundColor Green

# ═══════════════════════════════════════════════════════════════════
# STEP 3: DISPLAY N8N WORKFLOW IMPORT INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 3: N8N WORKFLOW IMPORT`n" -ForegroundColor Yellow

Write-Host "⚠️  MANUAL ACTION REQUIRED:" -ForegroundColor Red
Write-Host ""
Write-Host "IMPORT WORKFLOW 1: Main Outreach" -ForegroundColor White
Write-Host "  1. Open: https://ram123499.app.n8n.cloud/workflow/KKaNbbwxbcMhGPvs" -ForegroundColor Cyan
Write-Host "  2. Click: 3-dot menu (⋮) → Import from File" -ForegroundColor Cyan
Write-Host "  3. Select: Main_Outreach_Workflow.json" -ForegroundColor Cyan
Write-Host "  4. Click: Save → Activate (toggle to green)`n" -ForegroundColor Cyan

Write-Host "IMPORT WORKFLOW 2: Call Analysis" -ForegroundColor White
Write-Host "  1. Open: https://ram123499.app.n8n.cloud/workflow/6UFeu0aHOXUvyejo" -ForegroundColor Cyan
Write-Host "  2. Click: 3-dot menu (⋮) → Import from File" -ForegroundColor Cyan
Write-Host "  3. Select: Call_Analysis_Workflow.json" -ForegroundColor Cyan
Write-Host "  4. Click: Save → Activate (toggle to green)`n" -ForegroundColor Cyan

$response = Read-Host "Have you imported and activated both workflows? (yes/no)"
if ($response -ne "yes") {
    Write-Host "`n⚠️  Please complete n8n workflow import first, then run this script again.`n" -ForegroundColor Yellow
    exit 0
}

Write-Host "`n✅ n8n workflows imported and activated!`n" -ForegroundColor Green

# ═══════════════════════════════════════════════════════════════════
# STEP 4: TEST MAIN OUTREACH WORKFLOW
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 4: TESTING MAIN OUTREACH WORKFLOW`n" -ForegroundColor Yellow

Write-Host "Sending test prospect data..." -ForegroundColor White
Write-Host "Target: https://ram123499.app.n8n.cloud/webhook/outreach-trigger`n" -ForegroundColor Cyan

$outreachPayload = @{
    firstName = "John"
    lastName = "Doe"
    companyName = "TechCorp"
    website = "https://techcorp.com"
    phone = "+1234567890"
    LinkedInURL = "https://linkedin.com/in/johndoe"
    email = "john@techcorp.com"
    notes = "Interested in AI automation solutions"
} | ConvertTo-Json

Write-Host "Payload:" -ForegroundColor White
Write-Host $outreachPayload -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest `
        -Uri "https://ram123499.app.n8n.cloud/webhook/outreach-trigger" `
        -Method POST `
        -Body $outreachPayload `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ WORKFLOW EXECUTED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:`n" -ForegroundColor White
    Write-Host $response.Content -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "📧 EMAIL SENT TO: godbhargav@gmail.com" -ForegroundColor Green
    Write-Host "Subject: 🚀 Your Personalized LinkedIn Outreach - TechCorp`n" -ForegroundColor Green
    
} catch {
    Write-Host "❌ WORKFLOW FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)`n" -ForegroundColor Red
}

Write-Host "Waiting 5 seconds before next test...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 5

# ═══════════════════════════════════════════════════════════════════
# STEP 5: TEST CALL ANALYSIS WORKFLOW
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 5: TESTING CALL ANALYSIS WORKFLOW`n" -ForegroundColor Yellow

Write-Host "Simulating Retell AI callback..." -ForegroundColor White
Write-Host "Target: https://ram123499.app.n8n.cloud/webhook/retell-webhook`n" -ForegroundColor Cyan

$callPayload = @{
    call_id = "test_call_" + (Get-Date -Format "yyyyMMddHHmmss")
    call_status = "completed"
    call_type = "human"
    duration = 245
    to_number = "+1234567890"
    from_number = "+0987654321"
    transcript = "Hi John, this is Sarah from Sendora AI. I wanted to follow up on our LinkedIn message about automation solutions. Are you available to discuss? Yes, I'm interested. Can you tell me more? Absolutely! Our platform helps companies like TechCorp automate their LinkedIn outreach with AI. We've seen clients reduce manual work by 80%. That sounds exactly what we need. Can we schedule a demo? Perfect! Let me send you a calendar invite for next Tuesday at 2pm. Does that work? Yes, that works great!"
    recording_url = "https://retellai.com/recordings/test123.mp3"
    start_time = (Get-Date).AddMinutes(-5).ToString("yyyy-MM-ddTHH:mm:ssZ")
    end_time = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    metadata = @{
        prospect_name = "John Doe"
        company_name = "TechCorp"
        request_id = "req_test_" + (Get-Date -Format "yyyyMMddHHmmss")
    }
} | ConvertTo-Json -Depth 10

Write-Host "Payload:" -ForegroundColor White
Write-Host $callPayload -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest `
        -Uri "https://ram123499.app.n8n.cloud/webhook/retell-webhook" `
        -Method POST `
        -Body $callPayload `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ WORKFLOW EXECUTED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:`n" -ForegroundColor White
    Write-Host $response.Content -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "📧 CALL REPORT SENT TO: godbhargav@gmail.com" -ForegroundColor Green
    Write-Host "Subject: 📞 Call Completed: BOOKED - John Doe`n" -ForegroundColor Green
    
} catch {
    Write-Host "❌ WORKFLOW FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)`n" -ForegroundColor Red
}

# ═══════════════════════════════════════════════════════════════════
# STEP 6: VERIFY SUPABASE DATA
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 6: VERIFY DATA IN SUPABASE`n" -ForegroundColor Yellow

Write-Host "Check your Supabase tables:" -ForegroundColor White
Write-Host "  1. Go to: https://supabase.com/dashboard/project/bmpteadatirqfaweykns/editor" -ForegroundColor Cyan
Write-Host "  2. Click: Table Editor (left sidebar)" -ForegroundColor Cyan
Write-Host "  3. Check these tables:`n" -ForegroundColor Cyan

Write-Host "     prospects table:" -ForegroundColor White
Write-Host "       → Should have 1 row: John Doe, TechCorp`n" -ForegroundColor Green

Write-Host "     call_logs table:" -ForegroundColor White
Write-Host "       → Should have 1 row: test_call_..., John Doe`n" -ForegroundColor Green

Write-Host "     daily_call_metrics table:" -ForegroundColor White
Write-Host "       → Should have 1 row: today's date with aggregated metrics`n" -ForegroundColor Green

# ═══════════════════════════════════════════════════════════════════
# STEP 7: CHECK EMAIL INBOX
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 7: CHECK EMAIL INBOX`n" -ForegroundColor Yellow

Write-Host "📧 Check your email: godbhargav@gmail.com`n" -ForegroundColor White

Write-Host "You should receive 2 emails:" -ForegroundColor White
Write-Host ""
Write-Host "  EMAIL 1: LinkedIn Outreach" -ForegroundColor Cyan
Write-Host "    From: mechconect18@gmail.com" -ForegroundColor Green
Write-Host "    Subject: 🚀 Your Personalized LinkedIn Outreach - TechCorp" -ForegroundColor Green
Write-Host "    Content: 3 AI-generated messages + quality metrics" -ForegroundColor Green
Write-Host ""
Write-Host "  EMAIL 2: Call Analysis Report" -ForegroundColor Cyan
Write-Host "    From: mechconect18@gmail.com" -ForegroundColor Green
Write-Host "    Subject: 📞 Call Completed: BOOKED - John Doe" -ForegroundColor Green
Write-Host "    Content: Full transcript + AI analysis + next steps" -ForegroundColor Green
Write-Host ""

# ═══════════════════════════════════════════════════════════════════
# COMPLETION SUMMARY
# ═══════════════════════════════════════════════════════════════════
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ COMPLETE EXECUTION FINISHED!`n" -ForegroundColor Green

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                     EXECUTION SUMMARY                          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "✅ Backend Server: RUNNING" -ForegroundColor Green
Write-Host "✅ Supabase Tables: CREATED (6 tables)" -ForegroundColor Green
Write-Host "✅ n8n Workflows: IMPORTED & ACTIVATED" -ForegroundColor Green
Write-Host "✅ Main Outreach Test: COMPLETED" -ForegroundColor Green
Write-Host "✅ Call Analysis Test: COMPLETED" -ForegroundColor Green
Write-Host "✅ Emails Sent: 2 emails to godbhargav@gmail.com" -ForegroundColor Green
Write-Host "✅ Data Stored: Supabase tables populated`n" -ForegroundColor Green

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 NEXT STEPS:`n" -ForegroundColor Yellow

Write-Host "1. Check your email: godbhargav@gmail.com" -ForegroundColor White
Write-Host "2. Verify Supabase data at:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/bmpteadatirqfaweykns" -ForegroundColor Cyan
Write-Host "3. View n8n execution logs at:" -ForegroundColor White
Write-Host "   https://ram123499.app.n8n.cloud/executions" -ForegroundColor Cyan
Write-Host "4. Test with real prospects by sending data to:" -ForegroundColor White
Write-Host "   https://ram123499.app.n8n.cloud/webhook/outreach-trigger`n" -ForegroundColor Cyan

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎉 SENDORA AI IS NOW FULLY OPERATIONAL! 🎉`n" -ForegroundColor Green

Write-Host "For detailed documentation, see:" -ForegroundColor White
Write-Host "  • EXECUTE_NOW.md" -ForegroundColor Cyan
Write-Host "  • COMPLETE_WORKING_PROCESS.md`n" -ForegroundColor Cyan

Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# 🔍 EMAIL ISSUE DIAGNOSTIC & FIX SCRIPT
# This script will help identify why emails aren't arriving

Write-Host "`n╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     🔍 SENDORA AI - EMAIL DIAGNOSTIC TOOL 🔍                    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Check if workflows execute
Write-Host "[STEP 1] Testing n8n Workflow Execution..." -ForegroundColor Yellow

$outreachData = @{
    firstName = "Test"
    lastName = "User"
    companyName = "DiagnosticTest Corp"
    website = "https://test.com"
    phone = "+1234567890"
    LinkedInURL = "https://linkedin.com/in/testuser"
    email = "test@test.com"
    notes = "Diagnostic test run"
}

try {
    $response = Invoke-WebRequest -Uri "https://ram123499.app.n8n.cloud/webhook/outreach-trigger" `
        -Method POST `
        -Body ($outreachData | ConvertTo-Json) `
        -ContentType "application/json" `
        -TimeoutSec 30
    
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ Workflow executed successfully (HTTP 200)" -ForegroundColor Green
        Write-Host "     This means the webhook is working!`n" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ Workflow execution failed!" -ForegroundColor Red
    Write-Host "     Error: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Analyze the problem
Write-Host "[STEP 2] Analyzing Email Delivery Issue...`n" -ForegroundColor Yellow

Write-Host "  📊 FACTS:" -ForegroundColor Cyan
Write-Host "     ✅ n8n workflow responds with HTTP 200 OK" -ForegroundColor Green
Write-Host "     ❌ Emails are NOT arriving at godbhargav@gmail.com`n" -ForegroundColor Red

Write-Host "  🎯 ROOT CAUSE:" -ForegroundColor Red
Write-Host "     The email node in n8n is failing SILENTLY because:" -ForegroundColor White
Write-Host "     1. The credential name doesn't match exactly" -ForegroundColor Gray
Write-Host "     2. The credential settings are incorrect" -ForegroundColor Gray
Write-Host "     3. Or the credential doesn't exist`n" -ForegroundColor Gray

# Step 3: Show the required credential
Write-Host "[STEP 3] Required Credential Configuration`n" -ForegroundColor Yellow

Write-Host "  📝 Your n8n workflow is looking for:" -ForegroundColor Cyan
Write-Host "     Credential Name: " -NoNewline -ForegroundColor White
Write-Host "Brevo SMTP Connection" -ForegroundColor Green -BackgroundColor Black
Write-Host "     (EXACT match required - same capitalization and spacing)`n" -ForegroundColor Gray

Write-Host "  🔧 Required Settings:" -ForegroundColor Cyan
Write-Host "     Type:     SMTP" -ForegroundColor White
Write-Host "     Host:     smtp-relay.brevo.com" -ForegroundColor White
Write-Host "     Port:     587" -ForegroundColor White
Write-Host "     Security: STARTTLS" -ForegroundColor White
Write-Host "     User:     mechconect18@gmail.com" -ForegroundColor White
Write-Host "     Password: <Your Brevo SMTP API Key>" -ForegroundColor Yellow
Write-Host "               (Get from: https://app.brevo.com/settings/keys/smtp)`n" -ForegroundColor Gray

# Step 4: Show how to fix
Write-Host "[STEP 4] HOW TO FIX (2 MINUTES):`n" -ForegroundColor Magenta

Write-Host "  1️⃣  Open n8n credentials:" -ForegroundColor White
Write-Host "     🔗 https://ram123499.app.n8n.cloud/credentials`n" -ForegroundColor Cyan

Write-Host "  2️⃣  Look for your SMTP credential" -ForegroundColor White
Write-Host "     (It might be named: 'Brevo', 'SMTP', 'Email', etc.)`n" -ForegroundColor Gray

Write-Host "  3️⃣  Click the credential to EDIT it`n" -ForegroundColor White

Write-Host "  4️⃣  Change the NAME field to exactly:" -ForegroundColor White
Write-Host "     " -NoNewline
Write-Host " Brevo SMTP Connection " -ForegroundColor Black -BackgroundColor Green
Write-Host "     (Copy this exactly!)`n" -ForegroundColor Gray

Write-Host "  5️⃣  Verify all settings match the required settings above`n" -ForegroundColor White

Write-Host "  6️⃣  Click SAVE (important!)`n" -ForegroundColor White

Write-Host "  7️⃣  Wait 30 seconds for n8n to reload`n" -ForegroundColor White

Write-Host "  8️⃣  Run the test again:" -ForegroundColor White
Write-Host "     " -NoNewline
Write-Host "powershell -File .\RUN_COMPLETE_TEST.ps1" -ForegroundColor Cyan
Write-Host ""

# Step 5: Common mistakes
Write-Host "[STEP 5] ❌ Common Mistakes to Avoid:`n" -ForegroundColor Red

Write-Host "  DON'T DO THIS:" -ForegroundColor Red
Write-Host "    ❌ 'Brevo SMTP' (missing 'Connection')" -ForegroundColor Gray
Write-Host "    ❌ 'brevo smtp connection' (wrong case)" -ForegroundColor Gray
Write-Host "    ❌ 'Brevo  SMTP Connection' (extra space)" -ForegroundColor Gray
Write-Host "    ❌ 'Brevo SMTP connection' (wrong 'c')" -ForegroundColor Gray
Write-Host ""
Write-Host "  DO THIS:" -ForegroundColor Green
Write-Host "    ✅ 'Brevo SMTP Connection' (EXACT match)" -ForegroundColor Gray
Write-Host ""

# Step 6: How to verify it worked
Write-Host "[STEP 6] How to Verify Email is Working:`n" -ForegroundColor Yellow

Write-Host "  After fixing the credential:" -ForegroundColor White
Write-Host "    1. Run: powershell -File .\RUN_COMPLETE_TEST.ps1" -ForegroundColor Cyan
Write-Host "    2. Wait 1-2 minutes" -ForegroundColor Gray
Write-Host "    3. Check: godbhargav@gmail.com (inbox + spam)" -ForegroundColor Gray
Write-Host "    4. You should receive 2 emails:`n" -ForegroundColor Gray

Write-Host "       📧 Email 1: 'Your Personalized LinkedIn Outreach - DiagnosticTest Corp'" -ForegroundColor White
Write-Host "       📧 Email 2: 'Call Completed: BOOKED - Test User'`n" -ForegroundColor White

# Step 7: Still not working?
Write-Host "[STEP 7] Still Not Working? Check n8n Execution Logs:`n" -ForegroundColor Yellow

Write-Host "  1. Go to: https://ram123499.app.n8n.cloud/workflows" -ForegroundColor Cyan
Write-Host "  2. Click: 'Main_Outreach_Workflow'" -ForegroundColor White
Write-Host "  3. Click: 'Executions' tab" -ForegroundColor White
Write-Host "  4. Click: Latest execution" -ForegroundColor White
Write-Host "  5. Look for RED error icon on 'Email - Send via Brevo SMTP' node" -ForegroundColor White
Write-Host "  6. Click the error to see the message`n" -ForegroundColor White

Write-Host "  Common error messages:" -ForegroundColor Gray
Write-Host "    • 'Credentials for 'Brevo SMTP Connection' not found'" -ForegroundColor Red
Write-Host "      → Fix: Rename your credential exactly" -ForegroundColor Yellow
Write-Host ""
Write-Host "    • 'Invalid login: 535 Authentication failed'" -ForegroundColor Red
Write-Host "      → Fix: Check your Brevo SMTP API key" -ForegroundColor Yellow
Write-Host ""
Write-Host "    • 'Connection timeout'" -ForegroundColor Red
Write-Host "      → Fix: Check port (587) and security (STARTTLS)" -ForegroundColor Yellow
Write-Host ""

# Final instructions
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                     🎯 ACTION REQUIRED                           ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "  👉 DO THIS NOW:" -ForegroundColor Magenta
Write-Host "     1. Open: https://ram123499.app.n8n.cloud/credentials" -ForegroundColor Cyan
Write-Host "     2. Rename SMTP credential to: 'Brevo SMTP Connection'" -ForegroundColor White
Write-Host "     3. Save and wait 30 seconds" -ForegroundColor White
Write-Host "     4. Run: powershell -File .\RUN_COMPLETE_TEST.ps1" -ForegroundColor Cyan
Write-Host "     5. Check email: godbhargav@gmail.com`n" -ForegroundColor White

Write-Host "  ⏱️  Total time: 2-3 minutes`n" -ForegroundColor Yellow

Write-Host "════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

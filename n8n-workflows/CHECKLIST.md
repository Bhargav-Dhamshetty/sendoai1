# ⚡ SUPER FAST CHECKLIST

## 🎯 YOU NEED 3 THINGS:

### 1️⃣ SUPABASE (Database)
```
☐ Go to: https://supabase.com
☐ Click "Start your project"
☐ Create new project (choose free tier)
☐ Wait 2 minutes for setup
☐ Go to Settings → API
☐ Copy "Project URL": https://xxxxx.supabase.co
☐ Copy "service_role key": eyJhbGci...
☐ Go to SQL Editor
☐ Paste entire n8n-workflows/Supabase_Schema.sql
☐ Click RUN
☐ Verify: Table Editor shows 7 tables
```

### 2️⃣ N8N (Workflow Platform)
```
☐ Go to: https://n8n.io
☐ Click "Get started free"
☐ Sign up with email
☐ Click "New Workflow"
☐ Click ⋯ menu → Import from File
☐ Select: n8n-workflows/Main_Outreach_Workflow.json
☐ Click Import
☐ Click ⋯ menu → Import from File
☐ Select: n8n-workflows/Call_Analysis_Workflow.json
☐ Click Import
```

### 3️⃣ CONFIGURE N8N
```
☐ In n8n, click "Credentials" in sidebar
☐ Click "Add Credential"
☐ Select "Supabase"
☐ Enter Host: xxxxx.supabase.co (NO https://)
☐ Enter Service Role Key: eyJhbGci... (from Supabase)
☐ Click "Test" → Should say "Success"
☐ Click "Save"

☐ Click "Add Credential" again
☐ Select "SMTP"
☐ Enter:
    Host: smtp-relay.brevo.com
    Port: 587
    User: 9ab905001@smtp-brevo.com
    Password: XWdBcJUKws2PpTYE
    Secure: false
☐ Click "Test" → Should say "Success"
☐ Click "Save"
```

---

## 🎯 UPDATE WORKFLOW URL

```
☐ Open "Main Outreach Workflow" in n8n
☐ Click node: "HTTP - Call Gemini API Server"
☐ Change URL to: http://localhost:3000/generate
   (Or if you deploy: https://your-server.vercel.app/generate)
☐ Click "Save"
☐ Click "Activate" toggle (top right)
```

---

## ✅ TEST IT!

### Your server needs to be running:
```powershell
cd C:\Users\Abhishek\sendo
node server.js
```

### Then test webhook:
```bash
curl -X POST http://localhost:5678/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"companyName\":\"Test Corp\",\"website\":\"https://example.com\",\"phone\":\"+15555555555\",\"LinkedInURL\":\"https://linkedin.com/in/test\",\"email\":\"test@example.com\",\"notes\":\"Test\"}"
```

### Check Results:
```
☐ Check n8n execution history (should show success)
☐ Check Supabase Table Editor → ai_messages (should have 1 row)
☐ Check your email (should receive outreach email)
```

---

## 🚨 OPTIONAL (Add Later)

### RETELL AI (For Voice Calls)
```
☐ Go to: https://retellai.com
☐ Sign up (credit card required)
☐ Get API key
☐ Create agent with Retell_AI_Agent_Config.json
☐ Get phone number
☐ Configure in n8n
```

### CAL.COM (For Appointments)
```
☐ Go to: https://cal.com
☐ Sign up (free)
☐ Create event type
☐ Get API key
☐ Configure in n8n
```

---

## ⏱️ TIME ESTIMATE

- Supabase setup: 5 minutes
- n8n setup: 3 minutes
- Configure credentials: 2 minutes
- Test: 2 minutes

**TOTAL: ~12 minutes**

---

## 💡 QUICK TIPS

✅ **Your Gemini server is already working!**
✅ **Your Brevo email is already configured!**
✅ **You have all 10 Gemini API keys ready!**
✅ **All Python nodes converted to JavaScript (faster, no dependencies)!**

You just need:
1. Database (Supabase)
2. Workflow platform (n8n)
3. Connect them together

**That's it! Start with Supabase now! 🚀**

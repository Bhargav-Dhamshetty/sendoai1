# 🔑 Required Configuration - Action Items

## Placeholders You Need to Replace

### 1. Retell AI Configuration

#### 📍 Location: `Main_Outreach_Workflow.json` (Line ~570)
#### 📍 Location: `Call_Analysis_Workflow.json` (Line ~184)

**Current Placeholder:**
```
"from_number": "+1YOUR_RETELL_PHONE"
```

**Action Required:**
1. Go to [Retell AI Dashboard](https://app.retellai.com/) → Phone Numbers
2. Copy your registered phone number
3. Replace `+1YOUR_RETELL_PHONE` with your actual number (e.g., `+15551234567`)

---

#### 📍 Location: n8n Credential `Retell API Auth`

**Current Placeholder:**
```
"Authorization": "Bearer YOUR_RETELL_API_KEY"
```

**Action Required:**
1. Go to [Retell AI Dashboard](https://app.retellai.com/) → Settings → API Keys
2. Copy your API key
3. Create credential in n8n with name: `Retell API Auth`
4. Set header value: `Bearer <your-api-key>`

---

#### ⚠️ Retell AI Webhook Configuration

**Required Webhook URL:**
```
https://ram123499.app.n8n.cloud/webhook/retell-webhook
```

**Action Required:**
1. In Retell AI Dashboard, go to **Agents**
2. Edit agent: `agent_ea295365c16d68879208dc6bba`
3. Set **End-of-Call Webhook URL** to the URL above
4. Save changes

**✅ Already Configured:**
- Agent ID: `agent_ea295365c16d68879208dc6bba`
- LLM ID: `llm_5d00b1f3905454099e169d886c32`
- Voice: `11labs-Adrian`

---

### 2. Cal.com Configuration (Optional)

#### 📍 Location: `Call_Analysis_Workflow.json` (Line ~90)

**Current Placeholder:**
```
"eventTypeId": "YOUR_CAL_COM_EVENT_TYPE_ID"
```

**Action Required:**
1. Go to [Cal.com Event Types](https://app.cal.com/event-types)
2. Click on your event (e.g., "15 Min Meeting")
3. Copy the Event Type ID from URL or settings
4. Replace `YOUR_CAL_COM_EVENT_TYPE_ID` with actual ID

---

#### 📍 Location: n8n Credential (Line ~82)

**Current Placeholder:**
```
"Authorization": "Bearer YOUR_CAL_COM_API_KEY"
```

**Action Required:**
1. Go to [Cal.com Settings](https://app.cal.com/settings/developer)
2. Generate new API key
3. Create HTTP Header Auth credential in n8n
4. Set header value: `Bearer <your-cal-com-api-key>`

**Note:** Cal.com is optional. If not using, you can:
- Leave placeholders as-is
- Disable the "Cal.com - Create Booking" node
- Or remove the node entirely

---

### 3. Supabase Tables (Database Setup)

#### 📍 Action: Create Tables in Supabase

**Required Tables:**
1. `prospects` - Stores LinkedIn profile data
2. `call_metrics` - Stores Retell AI call results
3. `system_logs` - Error tracking

**SQL Script Location:** `CREDENTIALS_SETUP_GUIDE.md` (Section 1️⃣)

**Action Required:**
1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/bmpteadatirqfaweykns/editor)
2. Copy SQL from `CREDENTIALS_SETUP_GUIDE.md`
3. Run SQL to create tables
4. Verify tables exist in Database → Tables

**✅ Already Configured:**
- Supabase URL: `bmpteadatirqfaweykns.supabase.co`
- Service Role Key: (stored in workflows)
- Credential name: `Supabase Connection`

---

## ✅ Already Configured (No Action Needed)

### Brevo SMTP (Email)
- ✅ API Key: Updated to `xkeysib-7af44e66...747434e-rhuW31i8Qesx8x2M`
- ✅ SMTP Host: `smtp-relay.brevo.com:587`
- ✅ From Email: `mechconect18@gmail.com`
- ✅ To Email: `godbhargav@gmail.com`
- ✅ Credential: `Brevo SMTP Connection`

### Supabase Connection
- ✅ Project URL: `bmpteadatirqfaweykns.supabase.co`
- ✅ Service Role Key: Configured in workflows
- ✅ Credential: `Supabase Connection`

### n8n Webhooks
- ✅ Main Webhook: `https://ram123499.app.n8n.cloud/webhook/linkedin-outreach`
- ✅ Retell Webhook: `https://ram123499.app.n8n.cloud/webhook/retell-webhook`

### Retell AI Agent & LLM
- ✅ Agent: `agent_ea295365c16d68879208dc6bba`
- ✅ LLM: `llm_5d00b1f3905454099e169d886c32`
- ✅ Voice: `11labs-Adrian`

---

## 🎯 Quick Action Checklist

### Mandatory (Required to Run):
- [ ] **Retell Phone Number** - Replace in both workflow files
- [ ] **Retell API Key** - Create credential in n8n
- [ ] **Retell Webhook** - Configure in Retell AI dashboard
- [ ] **Supabase Tables** - Create using SQL script
- [ ] **Import Workflows** - Upload JSON files to n8n
- [ ] **Activate Workflows** - Toggle activation in n8n

### Optional (Enhanced Features):
- [ ] **Cal.com API Key** - For automatic booking
- [ ] **Cal.com Event Type ID** - For specific meeting type

---

## 📝 File Locations

All configuration files are in: `c:\Users\Abhishek\sendo`

### Workflow Files:
- `n8n-workflows/Main_Outreach_Workflow.json` (633 lines)
- `n8n-workflows/Call_Analysis_Workflow.json` (539 lines)

### Documentation:
- `CREDENTIALS_SETUP_GUIDE.md` - Complete setup instructions
- `REQUIRED_CONFIGURATION.md` - This file (action items)
- `.env.n8n` - Environment variable reference

### Backend:
- `gemini-api-server.js` - Gemini key rotation server (Port 3000)

---

## 🧪 Testing After Configuration

### Step 1: Start Backend Server
```powershell
cd c:\Users\Abhishek\sendo
node gemini-api-server.js
```

Expected output:
```
✅ Gemini API server running on http://localhost:3000
```

### Step 2: Test Main Workflow
```powershell
# Using Invoke-WebRequest (PowerShell)
$body = @{
    linkedinUrl = "https://www.linkedin.com/in/example-profile"
    phoneNumber = "+1234567890"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://ram123499.app.n8n.cloud/webhook/linkedin-outreach" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Step 3: Verify Execution
1. Check n8n workflow execution history
2. Verify Supabase `prospects` table has new row
3. Check email received at `godbhargav@gmail.com`
4. Confirm Retell AI call was initiated

---

## 🆘 Quick Fixes

### Workflow Won't Activate:
1. Check all credentials are connected (green checkmark)
2. Verify credential names match exactly
3. Look for error messages in workflow

### Retell Call Not Made:
1. Verify phone number format: `+15551234567` (no spaces/dashes)
2. Check Retell API key is valid
3. Ensure agent ID and LLM ID are correct

### Cal.com Booking Failed:
1. API key must have `booking:write` permission
2. Event Type ID must exist and be active
3. Email field must be valid (workflow uses placeholder if missing)

### Supabase Insert Failed:
1. Check Service Role Key (not anon key)
2. Verify tables exist with correct column names
3. Check Supabase API logs for errors

---

## 📞 What Happens After Setup?

1. **User sends webhook** → LinkedIn URL + Phone Number
2. **Main Workflow executes**:
   - Validates input
   - Scrapes LinkedIn profile
   - Calls Gemini API for analysis
   - Stores in Supabase
   - Sends email report
   - Initiates Retell AI call
3. **Call happens** → AI agent talks to prospect
4. **Call Analysis Workflow triggers**:
   - Receives call completion data
   - Analyzes tone & intent
   - Books Cal.com appointment (if interested)
   - Retries call (if voicemail)
   - Stores metrics in Supabase
   - Sends call report email

---

**Ready to go! 🚀**

Once you complete the checklist above, your Sendora AI system will be fully operational.

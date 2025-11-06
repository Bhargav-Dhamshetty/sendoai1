# 🚀 N8N WORKFLOWS - QUICK SETUP GUIDE

## ⚡ WHAT YOU NEED (API Keys)

### ✅ Already Configured (From your .env)
- ✅ **Gemini API Keys** (10 keys ready)
- ✅ **Brevo SMTP** (Email working)
- ✅ **Your Gemini Server** (Running on localhost:3000)

### ❌ NEED TO GET (For n8n workflows to work)

#### 1. **Supabase** (Database) - REQUIRED
```
Sign up: https://supabase.com
1. Create new project
2. Go to Settings → API
3. Copy these:
   - Project URL: https://xxxxx.supabase.co
   - Service Role Key: eyJhbGci... (NOT anon key!)
```

#### 2. **Retell AI** (Voice Calls) - REQUIRED
```
Sign up: https://retellai.com
1. Create account
2. Go to API Keys
3. Copy:
   - API Key: key_xxxxxx
   - Create an agent and copy Agent ID
   - Get a phone number and copy it
```

#### 3. **Cal.com** (Appointment Booking) - OPTIONAL
```
Sign up: https://cal.com
1. Go to Settings → API Keys
2. Create new API key
3. Create an event type
4. Copy:
   - API Key: cal_live_xxxxxx
   - Event Type ID: 123456
```

#### 4. **n8n** (Workflow Platform) - REQUIRED
```
Option A - Cloud (Easiest):
   Sign up: https://n8n.io
   Use cloud instance

Option B - Self-hosted:
   npm install n8n -g
   n8n start
```

---

## 🎯 SETUP STEPS (10 Minutes)

### Step 1: Get Supabase Keys (2 min)
```bash
1. Go to https://supabase.com
2. Create new project (choose free tier)
3. Wait 2 minutes for setup
4. Go to Settings → API
5. Copy "Project URL" and "service_role key"
```

### Step 2: Run Database Schema (1 min)
```bash
1. In Supabase dashboard, click "SQL Editor"
2. Open file: n8n-workflows/Supabase_Schema.sql
3. Copy entire content
4. Paste in SQL Editor
5. Click "Run"
6. Verify: Check "Table Editor" → Should see 7 tables
```

### Step 3: Get Retell AI Keys (3 min)
```bash
1. Go to https://retellai.com
2. Sign up (credit card required for calls)
3. Dashboard → API Keys → Copy API key
4. Dashboard → Agents → Create New Agent
5. Paste config from: n8n-workflows/Retell_AI_Agent_Config.json
6. Copy Agent ID
7. Dashboard → Phone Numbers → Get one → Copy number
```

### Step 4: Import n8n Workflows (2 min)
```bash
1. Log into n8n (cloud or local)
2. Click "Workflows" → "Import from File"
3. Select: n8n-workflows/Main_Outreach_Workflow.json
4. Click "Import"
5. Repeat for: Call_Analysis_Workflow.json
```

### Step 5: Configure Credentials in n8n (2 min)

#### Add Supabase Credential:
```
1. n8n → Credentials → Add Credential
2. Select "Supabase"
3. Enter:
   - Host: xxxxx.supabase.co (without https://)
   - Service Role Key: eyJhbGci... (from step 1)
4. Test → Save
```

#### Add SMTP Credential (Already have Brevo):
```
1. Credentials → Add "SMTP"
2. Enter:
   - Host: smtp-relay.brevo.com
   - Port: 587
   - User: 9ab905001@smtp-brevo.com
   - Password: XWdBcJUKws2PpTYE
   - Secure: false
3. Test → Save
```

#### Add HTTP Header Auth (Retell AI):
```
1. Credentials → Add "Header Auth"
2. Enter:
   - Name: Authorization
   - Value: Bearer key_xxxxxx (your Retell API key)
3. Save
```

---

## 🔧 UPDATE WORKFLOW URLS

### In Main_Outreach_Workflow.json:

Find node `http-gemini-api-006` and update URL:
```json
"url": "http://localhost:3000/generate"
```

**IMPORTANT**: If deploying n8n to cloud, you need to:
1. Deploy your server.js to Vercel/Railway/Render
2. Update URL to: `https://your-server.vercel.app/generate`

### Get Webhook URLs:

After importing workflows, activate them and copy webhook URLs:
```
Main Outreach: https://your-n8n.app.n8n.cloud/webhook/outreach-trigger
Call Analysis: https://your-n8n.app.n8n.cloud/webhook/retell-webhook
```

Update Retell AI agent with the Call Analysis webhook URL.

---

## ✅ TEST IT!

### Test 1: Main Workflow
```bash
curl -X POST http://localhost:5678/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "companyName": "Test Corp",
    "website": "https://example.com",
    "phone": "+15555555555",
    "LinkedInURL": "https://linkedin.com/in/test",
    "email": "test@example.com",
    "notes": "Test prospect"
  }'
```

### Verify in Supabase:
```sql
SELECT * FROM ai_messages ORDER BY timestamp DESC LIMIT 1;
SELECT * FROM api_logs ORDER BY timestamp DESC LIMIT 1;
```

---

## 🚨 MINIMUM TO START

If you want to test JUST the main workflow WITHOUT voice calls:

**MUST HAVE**:
- ✅ Supabase (database)
- ✅ Your Gemini server running (you have this)
- ✅ Brevo SMTP (you have this)

**CAN SKIP FOR NOW**:
- ⏭️ Retell AI (just remove the voice call node)
- ⏭️ Cal.com (only needed for appointment booking)

---

## 🎯 SIMPLIFIED SETUP (5 min - No Voice Calls)

1. **Get Supabase** (2 min):
   - https://supabase.com → Create project
   - Copy URL and service_role key

2. **Run SQL** (1 min):
   - Supabase SQL Editor → Paste Supabase_Schema.sql → Run

3. **Import Workflow** (1 min):
   - n8n → Import Main_Outreach_Workflow.json

4. **Add Credentials** (1 min):
   - Add Supabase credential (from step 1)
   - Add SMTP credential (use your Brevo details)

5. **Test**:
   ```bash
   curl -X POST http://localhost:5678/webhook/outreach-trigger \
     -H "Content-Type: application/json" \
     -d '{"firstName":"John","lastName":"Doe",...}'
   ```

---

## 💡 QUICK ANSWERS

**Q: Do I need to pay for anything?**
- Supabase: Free tier (500MB database)
- Retell AI: Pay per call (~$0.05-0.15/min)
- Cal.com: Free tier works
- n8n: Free cloud tier OR self-host free

**Q: Can I test without Retell AI?**
- YES! Just disable the "Retell AI - Trigger Voice Call" node

**Q: Where do I deploy my server.js?**
- Vercel (free, easiest): `vercel deploy`
- Railway: `railway up`
- Or keep localhost for testing

**Q: Do workflows work with localhost:3000?**
- YES for local n8n testing
- NO if n8n is cloud-hosted (needs public URL)

---

## 🎉 THAT'S IT!

**Priority Setup**:
1. Supabase (10 min total)
2. Import workflow to n8n
3. Test with your existing Gemini server

**Later Add**:
- Retell AI for voice calls
- Cal.com for bookings
- Deploy server to Vercel for production

**Your Gemini server is already running and working! ✅**

Start with Supabase + n8n, test the workflow, then add voice later!

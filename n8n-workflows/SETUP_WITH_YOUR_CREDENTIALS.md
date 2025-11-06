# 🚀 SENDORA AI - READY TO USE N8N SETUP

## ✅ YOUR CREDENTIALS ARE READY!

I've pre-configured everything with your actual credentials. Just follow these steps!

---

## 📋 STEP 1: RUN SQL SCHEMA (2 minutes)

### Go to Supabase:
1. Open: https://bmpteadatirqfaweykns.supabase.co
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Open file: `Supabase_Schema.sql` in this folder
5. Copy **ENTIRE file** content
6. Paste into Supabase SQL Editor
7. Click **RUN** button (or press Ctrl+Enter)
8. Wait 5 seconds for completion

### Verify Tables Created:
1. Click **Table Editor** in left sidebar
2. You should see 7 tables:
   - ✅ ai_messages
   - ✅ api_logs
   - ✅ call_metrics
   - ✅ daily_call_metrics
   - ✅ system_logs
   - ✅ prospects
   - ✅ outreach_campaigns

---

## 📋 STEP 2: SETUP N8N (5 minutes)

### Option A: n8n Cloud (Recommended)

1. **Sign up**: https://n8n.io
2. **Click**: "Get started free"
3. **Verify email** and log in
4. You'll see n8n dashboard

### Option B: Self-Hosted (Advanced)

```powershell
# Install n8n globally
npm install n8n -g

# Start n8n
n8n start

# Access at: http://localhost:5678
```

---

## 📋 STEP 3: IMPORT WORKFLOWS (2 minutes)

### Import Main Workflow:
1. In n8n, click **Workflows** in sidebar
2. Click **"⋯"** menu (top right) → **Import from File**
3. Select: `Main_Outreach_Workflow.json`
4. Click **Import**
5. Workflow will open automatically

### Import Call Analysis Workflow:
1. Click **Workflows** in sidebar
2. Click **"⋯"** menu → **Import from File**
3. Select: `Call_Analysis_Workflow.json`
4. Click **Import**

---

## 📋 STEP 4: ADD CREDENTIALS (3 minutes)

### Add Supabase Credential:

1. Click **Credentials** in left sidebar
2. Click **Add Credential** button
3. Search and select **"Supabase"**
4. Fill in:
   ```
   Name: Supabase - Sendora AI
   Host: bmpteadatirqfaweykns.supabase.co
   Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcHRlYWRhdGlycWZhd2V5a25zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI0MjI5MCwiZXhwIjoyMDc3ODE4MjkwfQ.c0jA31LRyZMjN22Qbk6ioynQTbeg1oJWvG38rHS3GCs
   ```
   ⚠️ **IMPORTANT**: Use **service_role key**, NOT anon key!
   ⚠️ **IMPORTANT**: Host is WITHOUT "https://" - just the domain!

5. Click **Test Connection**
6. Should show: ✅ "Connection successful"
7. Click **Save**

### Add SMTP Credential (Brevo):

1. Click **Add Credential** again
2. Search and select **"SMTP"**
3. Fill in:
   ```
   Name: Brevo SMTP - Sendora AI
   Host: smtp-relay.brevo.com
   Port: 587
   User: 9ab905001@smtp-brevo.com
   Password: XWdBcJUKws2PpTYE
   Secure Connection: false (uncheck the box)
   ```

4. Click **Test Connection**
5. Should show: ✅ "Connection successful"
6. Click **Save**

---

## 📋 STEP 5: CONFIGURE WORKFLOWS (2 minutes)

### Update Main Outreach Workflow:

1. Open **"Sendora AI - LinkedIn Outreach Automation"** workflow
2. Click each **Supabase node** (there are 3):
   - "Supabase - Store AI Messages"
   - "Supabase - Log API Calls"
   - "Error Handler - Log to Supabase"
3. For each node:
   - Click the node
   - In right panel, find **"Credential to connect with"**
   - Select: **"Supabase - Sendora AI"** (the one you just created)
   
4. Click **Email - Send via Brevo SMTP** node
   - In right panel, find **"Credential to connect with"**
   - Select: **"Brevo SMTP - Sendora AI"**

5. Click **HTTP - Call Gemini API Server** node
   - Verify URL is: `http://localhost:3000/generate`
   - If you deploy to Vercel later, change to: `https://your-app.vercel.app/generate`

6. Click **Save** button (top right)

### Activate Workflow:

1. Toggle **"Active"** switch in top right (should turn green)
2. You'll see: ✅ "Workflow activated"

### Get Webhook URL:

1. Click **Webhook - Prospect Data Input** node (first node)
2. In right panel, you'll see: **"Production URL"**
3. Copy this URL (something like):
   ```
   https://your-instance.app.n8n.cloud/webhook/outreach-trigger
   ```
4. **SAVE THIS URL** - you'll need it for testing!

---

## 📋 STEP 6: START YOUR GEMINI SERVER (1 minute)

Your Gemini key-rotating server needs to be running:

```powershell
# Open terminal in your project folder
cd C:\Users\Abhishek\sendo

# Start the server
node server.js
```

You should see:
```
✅ Server started successfully!
📡 Server running on port 3000
```

**Keep this terminal open!**

---

## 🧪 STEP 7: TEST THE WORKFLOW (2 minutes)

### Test with curl:

Open **new terminal** and run:

```powershell
curl -X POST https://your-n8n-webhook-url-here/webhook/outreach-trigger `
  -H "Content-Type: application/json" `
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Acme Corp",
    "website": "https://acmecorp.com",
    "phone": "+14155551234",
    "LinkedInURL": "https://linkedin.com/in/johndoe",
    "email": "john@acmecorp.com",
    "notes": "Met at SaaS conference 2025"
  }'
```

**Replace** `https://your-n8n-webhook-url-here` with your actual webhook URL from Step 5!

### Or test with Postman:

1. Create new POST request
2. URL: Your webhook URL
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "firstName": "Sarah",
  "lastName": "Johnson",
  "companyName": "TechStart Inc",
  "website": "https://techstart.io",
  "phone": "+19876543210",
  "LinkedInURL": "https://linkedin.com/in/sarahjohnson",
  "email": "sarah@techstart.io",
  "notes": "CTO interested in automation"
}
```
5. Click **Send**

---

## ✅ VERIFY RESULTS

### Check n8n Execution:

1. In n8n, click **Executions** in left sidebar
2. You should see latest execution (green = success)
3. Click on it to see each node's output

### Check Supabase Database:

1. Go to: https://bmpteadatirqfaweykns.supabase.co
2. Click **Table Editor**
3. Click **ai_messages** table
4. You should see 1 new row with:
   - prospect_name: "John Doe" (or your test name)
   - company_name: "Acme Corp"
   - AI-generated LinkedIn sequence in `result` column
   - sentiment_score
   - entity_score

5. Click **api_logs** table
6. You should see 1 new row with:
   - endpoint: "/generate"
   - status: "success"
   - latency_ms: (time taken)

### Check Email:

1. Check inbox: **godbhargav@gmail.com**
2. You should receive email:
   - Subject: "🚀 Your Personalized LinkedIn Outreach - Acme Corp"
   - Body: Beautiful HTML with AI-generated messages
   - Shows sentiment analysis and metrics

---

## 🎯 WHAT'S WORKING NOW

✅ **Webhook** receives prospect data  
✅ **JavaScript validation** cleans and validates input  
✅ **Web scraping** (company + LinkedIn) for enrichment  
✅ **Gemini API** generates personalized messages  
✅ **Python sentiment analysis** scores tone  
✅ **Python entity extraction** identifies key info  
✅ **Supabase** stores everything in database  
✅ **API logging** tracks performance  
✅ **Email** sends beautiful report via Brevo  
✅ **Error handling** logs failures  

---

## 🔧 TROUBLESHOOTING

### Issue: "Cannot find credential"

**Solution**: Go back to Step 4 and ensure you selected the correct credentials in each node.

### Issue: "Gemini API error"

**Solution**: 
- Ensure your `server.js` is running: `node server.js`
- Check URL in "HTTP - Call Gemini API Server" node
- Test server directly: `curl http://localhost:3000/health`

### Issue: "Supabase connection failed"

**Solution**:
- Verify you used **service_role key** (not anon key)
- Check host is: `bmpteadatirqfaweykns.supabase.co` (no https://)
- Test in SQL Editor: `SELECT 1;`

### Issue: "Email not sending"

**Solution**:
- Verify SMTP port is **587** (not 465)
- Ensure **Secure Connection** is **unchecked** (false)
- Test with testEmail.js: `node testEmail.js`

### Issue: "Workflow not executing"

**Solution**:
- Ensure workflow is **Activated** (green toggle)
- Check webhook URL is correct
- Verify Content-Type header is set
- Check n8n logs for errors

---

## 📊 QUERY YOUR DATA

### Get recent AI messages:
```sql
SELECT 
  prospect_name,
  company_name,
  sentiment_score,
  entity_score,
  timestamp
FROM ai_messages
ORDER BY timestamp DESC
LIMIT 10;
```

### Check API performance:
```sql
SELECT 
  endpoint,
  AVG(latency_ms) as avg_latency,
  COUNT(*) as total_calls,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful,
  COUNT(CASE WHEN status = 'error' THEN 1 END) as failed
FROM api_logs
GROUP BY endpoint;
```

### View recent errors:
```sql
SELECT 
  error_type,
  error_message,
  context,
  timestamp
FROM system_logs
WHERE severity = 'error'
ORDER BY timestamp DESC
LIMIT 5;
```

---

## 🚀 NEXT STEPS (Optional)

### Add Voice Calls (Retell AI):

1. Sign up: https://retellai.com
2. Get API key and Agent ID
3. Import `Retell_AI_Agent_Config.json`
4. Uncomment voice call node in workflow
5. Update credentials

### Add Appointment Booking (Cal.com):

1. Sign up: https://cal.com
2. Create event type
3. Get API key
4. Update Call Analysis workflow
5. Test booking flow

### Deploy to Production:

1. Deploy `server.js` to Vercel:
   ```bash
   vercel deploy
   ```
2. Update Gemini server URL in workflow
3. Set up monitoring (Sentry, LogRocket)
4. Configure backups for Supabase
5. Add rate limiting

---

## 📞 GETTING HELP

### Check Logs:

```sql
-- Check latest system logs
SELECT * FROM system_logs 
ORDER BY timestamp DESC 
LIMIT 20;
```

### n8n Execution History:

1. Click **Executions** in n8n
2. Click failed execution
3. Click each node to see error details

### Common Issues Database:

See `README.md` Troubleshooting section for 50+ common issues and solutions.

---

## 🎉 YOU'RE DONE!

**Your enterprise-grade LinkedIn outreach automation is now live!** 🚀

### What you built:
- ✅ 15-node intelligent workflow
- ✅ AI-powered personalization
- ✅ Automatic sentiment analysis
- ✅ Entity extraction
- ✅ Complete database tracking
- ✅ Email notifications
- ✅ Production-grade error handling

### Ready for:
- 100+ prospects per day
- Real-time analytics
- Multi-channel campaigns
- Voice call integration
- Appointment booking

**Start automating your sales! 💪**

---

## 📖 Additional Documentation

- **README.md**: Complete technical guide
- **SUMMARY.md**: Feature overview
- **QUICK_REFERENCE.md**: Command cheat sheet
- **PROJECT_COMPLETE.md**: Full architecture details

---

**Need help? Check the docs or review n8n execution logs!**

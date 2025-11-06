# 🚀 Sendora AI - Quick Reference Card

## 📋 Import Checklist

```
□ Import Main_Outreach_Workflow.json to n8n
□ Import Call_Analysis_Workflow.json to n8n
□ Run Supabase_Schema.sql in Supabase SQL Editor
□ Create Retell AI agent with Retell_AI_Agent_Config.json
□ Configure Supabase credentials in n8n
□ Configure SMTP credentials in n8n
□ Configure HTTP Auth for Retell AI in n8n
□ Update VERCEL_SERVER_URL in workflows
□ Activate both workflows
□ Test with sample webhook call
```

---

## 🔗 Webhook URLs

```bash
# Main Outreach Trigger
POST https://your-n8n.cloud/webhook/outreach-trigger

# Call Analysis (Retell AI callback)
POST https://your-n8n.cloud/webhook/retell-webhook
```

---

## 📊 Key Tables

| Table | Purpose |
|-------|---------|
| `ai_messages` | AI-generated LinkedIn messages |
| `api_logs` | API call tracking & latency |
| `call_metrics` | Detailed call data & transcripts |
| `daily_call_metrics` | Aggregated daily statistics |
| `system_logs` | Error & event logging |

---

## 🔧 Environment Variables

```env
VERCEL_SERVER_URL=https://your-server.vercel.app
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
RETELL_API_KEY=key_xxxxxx
RETELL_AGENT_ID=agent_xxxxxx
RETELL_FROM_NUMBER=+1234567890
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_brevo_login
EMAIL_PASSWORD=your_brevo_password
ALERT_EMAIL_FROM=your@email.com
ALERT_EMAIL_TO=recipient@email.com
CAL_COM_API_KEY=cal_live_xxxxxx
CAL_COM_EVENT_TYPE_ID=123456
N8N_WEBHOOK_BASE_URL=https://your-n8n.cloud
```

---

## 🧪 Test Command

```bash
curl -X POST https://your-n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Acme Corp",
    "website": "https://acmecorp.com",
    "phone": "+1234567890",
    "LinkedInURL": "https://linkedin.com/in/johndoe",
    "email": "john@acmecorp.com",
    "notes": "Test prospect"
  }'
```

---

## 📈 Key Metrics Queries

```sql
-- Today's performance
SELECT * FROM v_daily_call_performance 
WHERE metric_date = CURRENT_DATE;

-- Recent errors
SELECT * FROM system_logs 
WHERE severity = 'error' 
ORDER BY timestamp DESC 
LIMIT 10;

-- Top performing messages
SELECT * FROM v_recent_successful_outreach 
WHERE sentiment_score > 0.7 
LIMIT 10;
```

---

## 🎯 Workflow Nodes Count

- **Main Outreach**: 15 nodes
- **Call Analysis**: 13 nodes
- **Total**: 28 nodes

---

## 🔍 Common Issues

| Issue | Solution |
|-------|----------|
| Webhook not triggering | Activate workflow in n8n |
| Gemini API error | Check model name: `gemini-2.5-flash` |
| Supabase connection failed | Use service role key, not anon key |
| Email not sending | Verify SMTP port 587, secure=false |
| Call not triggered | Check phone format: `+1234567890` |
| Python node failing | Ensure Python 3.8+ available |

---

## 🛠️ Node IDs Reference

### Main Workflow
- `webhook-trigger-001` - Entry point
- `js-validate-input-002` - Input validation
- `webscraper-company-003` - Company scraping
- `webscraper-linkedin-004` - LinkedIn scraping
- `js-format-prompt-005` - Prompt formatting
- `http-gemini-api-006` - Gemini API call
- `js-validate-response-007` - Response validation
- `python-sentiment-008` - Sentiment analysis
- `python-entity-extraction-009` - Entity extraction
- `supabase-store-messages-010` - Save messages
- `supabase-log-api-011` - Log API calls
- `email-send-012` - Send email
- `retell-trigger-call-013` - Trigger call
- `respond-webhook-014` - Send response
- `error-handler-015` - Error logging

### Call Analysis
- `webhook-retell-001` - Retell callback
- `js-parse-call-data-002` - Parse data
- `python-tone-analysis-003` - Tone analysis
- `if-booked-004` - Check if booked
- `calcom-book-005` - Create booking
- `if-retry-006` - Check retry needed
- `wait-retry-007` - Wait 15 minutes
- `retell-retry-call-008` - Retry call
- `supabase-store-call-009` - Save call
- `supabase-update-metrics-010` - Update metrics
- `email-call-report-011` - Send report
- `respond-webhook-012` - Send response
- `error-handler-013` - Error logging

---

## 📞 Retell AI Functions

1. **getPromptFromWebhook()** - Fetch AI context
2. **analyzeTone()** - Real-time sentiment
3. **summarizeCall()** - Generate summary

---

## 🎨 Customization Quick Links

- **Change AI Prompt**: `js-format-prompt-005` → line 24
- **Adjust Sentiment**: `python-sentiment-008` → line 35
- **Modify Retry Logic**: `if-retry-006` → conditions
- **Update Email Template**: `email-send-012` → html parameter
- **Edit Voice Script**: `Retell_AI_Agent_Config.json` → general_prompt

---

## 📚 Documentation Files

1. **README.md** - Complete setup guide (17,000+ words)
2. **SUMMARY.md** - Quick overview
3. **QUICK_REFERENCE.md** - This file
4. **Supabase_Schema.sql** - Database schema
5. **Main_Outreach_Workflow.json** - n8n workflow
6. **Call_Analysis_Workflow.json** - n8n workflow
7. **Retell_AI_Agent_Config.json** - Retell config

---

## ⚡ Performance Targets

- Outreach processing: < 45 sec
- AI generation: < 8 sec
- Call analysis: < 2 sec
- Database write: < 500ms

---

## 🎓 Learning Resources

- [n8n Documentation](https://docs.n8n.io)
- [Supabase Docs](https://supabase.com/docs)
- [Retell AI Docs](https://docs.retellai.com)
- [Gemini API Guide](https://ai.google.dev/docs)

---

## 🚨 Emergency Commands

```bash
# Stop all n8n workflows
# Go to n8n UI → Workflows → Deactivate All

# Clear error logs
DELETE FROM system_logs WHERE severity != 'critical';

# Reset daily metrics
DELETE FROM daily_call_metrics WHERE metric_date = CURRENT_DATE;

# Check active calls
SELECT * FROM call_metrics 
WHERE call_status = 'in_progress' 
AND timestamp > NOW() - INTERVAL '1 hour';
```

---

## 📊 Success Criteria

✅ Workflow imports without errors  
✅ All credentials configured  
✅ Test webhook returns 200 OK  
✅ AI messages saved to Supabase  
✅ Email received in inbox  
✅ Call triggered successfully  
✅ Metrics updating in database  
✅ Zero critical errors in logs  

---

**Keep this card handy for quick reference! 📌**

For detailed information, see README.md

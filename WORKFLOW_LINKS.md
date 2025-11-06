# 🔗 n8n Workflow Links - Sendora AI

## 📋 Active Workflows

### 1️⃣ Main Outreach Workflow
**Live URL:** https://ram123499.app.n8n.cloud/workflow/KKaNbbwxbcMhGPvs

**Purpose:** LinkedIn outreach automation with AI message generation
- Receives prospect data via webhook
- Scrapes company website & LinkedIn profile
- Generates personalized outreach messages via Gemini API
- Sends email via Brevo SMTP
- Triggers Retell AI voice call
- Stores data in Supabase

**Webhook Endpoint:**
```
POST https://ram123499.app.n8n.cloud/webhook/outreach-trigger
```

**Test Request:**
```bash
curl -X POST https://ram123499.app.n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Acme Corp",
    "website": "https://example.com",
    "phone": "+15551234567",
    "LinkedInURL": "https://linkedin.com/in/johndoe",
    "email": "john@acmecorp.com",
    "notes": "Interested in automation"
  }'
```

---

### 2️⃣ Call Analysis Workflow
**Live URL:** https://ram123499.app.n8n.cloud/workflow/6UFeu0aHOXUvyejo

**Purpose:** Retell AI call callback processing and analysis
- Receives call completion webhooks from Retell AI
- Parses call data (transcript, duration, status)
- Analyzes tone and intent
- Determines call type (human/voicemail/no-answer)
- Stores call metrics in Supabase
- Sends summary email
- Schedules retry if needed

**Webhook Endpoint:**
```
POST https://ram123499.app.n8n.cloud/webhook/retell-webhook
```

**Test Request:**
```bash
curl -X POST https://ram123499.app.n8n.cloud/webhook/retell-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "call_id": "test-call-123",
    "call_status": "completed",
    "duration": 245,
    "to_number": "+15551234567",
    "transcript": "Hello, this is a test call transcript.",
    "recording_url": "https://example.com/recording.mp3",
    "metadata": {
      "prospect_name": "John Doe",
      "company_name": "Acme Corp",
      "email": "john@acmecorp.com"
    }
  }'
```

---

## 🎯 Quick Access

| Workflow | Direct Link | Webhook URL |
|----------|-------------|-------------|
| **Main Outreach** | [KKaNbbwxbcMhGPvs](https://ram123499.app.n8n.cloud/workflow/KKaNbbwxbcMhGPvs) | `/webhook/outreach-trigger` |
| **Call Analysis** | [6UFeu0aHOXUvyejo](https://ram123499.app.n8n.cloud/workflow/6UFeu0aHOXUvyejo) | `/webhook/retell-webhook` |

---

## 🔧 Workflow Management

### Edit Workflows
- Main Outreach: https://ram123499.app.n8n.cloud/workflow/KKaNbbwxbcMhGPvs
- Call Analysis: https://ram123499.app.n8n.cloud/workflow/6UFeu0aHOXUvyejo

### View All Workflows
https://ram123499.app.n8n.cloud/workflows

### Credentials Page
https://ram123499.app.n8n.cloud/home/credentials

### Execution History
https://ram123499.app.n8n.cloud/executions

---

## 📊 Integration Points

### Backend Server
- **URL:** http://localhost:3000
- **Endpoint:** `/generate` (Gemini API)
- **Health Check:** `/health`

### Supabase Database
- **Project:** bmpteadatirqfaweykns.supabase.co
- **Tables:** prospects, call_metrics, system_logs, ai_messages, api_logs

### Email Service
- **Provider:** Brevo SMTP
- **Server:** smtp-relay.brevo.com:587
- **From:** mechconect18@gmail.com

### Voice AI
- **Provider:** Retell AI
- **Agent ID:** agent_ea295365c16d68879208dc6bba
- **LLM ID:** llm_5d00b1f3905454099e169d886c32
- **Callback:** https://ram123499.app.n8n.cloud/webhook/retell-webhook

---

## 🚀 Status

✅ Both workflows are **ACTIVE** and ready to receive webhooks
✅ All credentials configured
✅ Backend server running on localhost:3000
✅ Supabase tables created and accessible
✅ Error handling and validation implemented

---

## 📝 Notes

- Workflows set to `active: true` by default
- Flexible field validation prevents execution failures
- Graceful error handling with fallback values
- All nodes use JavaScript (no Python dependencies)
- Retell AI phone number: +18885551234 (update if needed)

---

**Last Updated:** November 4, 2025
**Version:** 2.0 (Fixed)

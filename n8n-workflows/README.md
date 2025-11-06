# 🚀 Sendora AI - n8n Workflow Suite

## Complete Production-Grade LinkedIn Outreach & AI Voice Automation System

This repository contains enterprise-ready n8n workflows that automate LinkedIn outreach, AI-powered message generation, voice calling with Retell AI, and comprehensive analytics.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Workflow Descriptions](#workflow-descriptions)
8. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**Sendora AI** is a complete sales automation platform that combines:

- ✅ **AI-Generated LinkedIn Outreach** using Google Gemini 2.5
- ✅ **Intelligent Web Scraping** for company & LinkedIn data enrichment
- ✅ **Sentiment & Entity Analysis** with Python ML algorithms
- ✅ **Automated Voice Calls** via Retell AI with custom functions
- ✅ **Appointment Booking** through Cal.com integration
- ✅ **Email Notifications** using Brevo SMTP
- ✅ **Comprehensive Analytics** in Supabase with daily metrics
- ✅ **Voicemail Detection & Auto-Retry** logic
- ✅ **Production-Grade Error Handling** with detailed logging

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        WEBHOOK TRIGGER                          │
│                  (Prospect Data: firstName, lastName, etc.)     │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              JS - VALIDATE & SANITIZE INPUT                     │
│          (Email validation, phone formatting, request ID)       │
└─────────┬──────────────────────────────────────────┬────────────┘
          │                                           │
          ▼                                           ▼
┌──────────────────────┐                  ┌──────────────────────┐
│  WebScraper - Company│                  │ WebScraper - LinkedIn│
│      Website Data    │                  │    Profile Data      │
└─────────┬────────────┘                  └──────────┬───────────┘
          │                                           │
          └─────────────────┬─────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           JS - FORMAT DYNAMIC PROMPT                            │
│     (Merge scraped data, build enriched context for AI)        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│         HTTP - CALL GEMINI API SERVER (Vercel)                  │
│           (POST /generate with formatted prompt)                │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│           JS - VALIDATE AI RESPONSE                             │
│     (Check message quality, parse JSON, validation checks)      │
└─────────┬──────────────────────────────────────────┬────────────┘
          │                                           │
          ▼                                           ▼
┌──────────────────────┐                  ┌──────────────────────┐
│  Python - Sentiment  │                  │ Python - Entity      │
│     Analysis         │                  │   Extraction         │
│  (Tone, readability) │                  │ (Names, tech, CTAs)  │
└─────────┬────────────┘                  └──────────┬───────────┘
          │                                           │
          └─────────────────┬─────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│            SUPABASE - STORE AI MESSAGES                         │
│     (Save to ai_messages table with all metadata)               │
└─────────┬─────────────────────────┬─────────────────┬───────────┘
          │                         │                 │
          ▼                         ▼                 ▼
┌──────────────────┐    ┌──────────────────┐  ┌─────────────────┐
│  Supabase - Log  │    │  Email - Send    │  │ Retell AI -     │
│   API Calls      │    │  via Brevo SMTP  │  │ Trigger Voice   │
│                  │    │                  │  │     Call        │
└──────────────────┘    └──────────────────┘  └─────────────────┘
```

### Call Analysis Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│           WEBHOOK - RETELL AI CALLBACK                          │
│              (Call completion data from Retell)                 │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│             JS - PARSE CALL DATA                                │
│   (Detect voicemail vs human, extract metadata)                │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│       PYTHON - TONE & INTENT ANALYSIS                           │
│  (Detect: Interested / Rejected / Booked)                      │
└─────────┬──────────────────────┬──────────────────┬─────────────┘
          │                      │                  │
          ▼                      ▼                  ▼
┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐
│ IF - Appointment │  │ IF - Should      │  │ Supabase - Store   │
│    Booked?       │  │   Retry?         │  │   Call Data        │
│                  │  │                  │  │                    │
└─────────┬────────┘  └─────────┬────────┘  └─────────┬──────────┘
          │                     │                      │
          ▼                     ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐
│ Cal.com - Book   │  │ Wait - 15 Min    │  │ Supabase - Update  │
│  Appointment     │  │ Then Retry Call  │  │  Daily Metrics     │
└─────────┬────────┘  └─────────┬────────┘  └─────────┬──────────┘
          │                     │                      │
          └────────────┬────────┘                      │
                       │                               │
                       └───────────────┬───────────────┘
                                       │
                                       ▼
                         ┌──────────────────────────────┐
                         │  Email - Send Call Report    │
                         │  (Detailed analysis + next   │
                         │       steps)                 │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                         ┌──────────────────────────────┐
                         │   Respond to Webhook         │
                         │      (200 OK)                │
                         └──────────────────────────────┘
```

---

## ✨ Features

### Main Outreach Workflow

1. **Webhook Trigger** - Accepts 8 prospect fields
2. **Input Validation** - Email, phone, LinkedIn URL validation
3. **Dual Web Scraping** - Company website + LinkedIn profile
4. **Dynamic Prompt Formatting** - Merge all data into enriched AI prompt
5. **Gemini API Integration** - Call your Vercel server with retry logic
6. **Response Validation** - Ensure AI output meets quality standards
7. **Sentiment Analysis** - Python-based tone & readability scoring
8. **Entity Extraction** - Extract names, technologies, pain points, CTAs
9. **Supabase Storage** - Save messages and logs to database
10. **Email Delivery** - Beautiful HTML email via Brevo SMTP
11. **Voice Call Trigger** - Initiate Retell AI call with personalized script
12. **Error Handling** - Comprehensive logging to system_logs table

### Call Analysis Workflow

1. **Retell Webhook** - Receives call completion data
2. **Call Type Detection** - Identifies human vs voicemail vs no-answer
3. **Tone Analysis** - Python ML detects: Interested, Rejected, or Booked
4. **Smart Retry Logic** - Auto-retries voicemails once after 15 minutes
5. **Cal.com Booking** - Creates appointments for booked calls
6. **Daily Metrics** - Aggregates: total calls, pickups, rejections, appointments
7. **Call Report Email** - Sends detailed analysis with transcript
8. **Error Recovery** - Logs failures and continues execution

### Retell AI Custom Functions

1. **`getPromptFromWebhook()`** - Fetches AI-generated context from n8n
2. **`analyzeTone()`** - Real-time sentiment analysis during call
3. **`summarizeCall()`** - Generates comprehensive call summary

---

## 📦 Prerequisites

### Required Services

| Service | Purpose | Sign Up |
|---------|---------|---------|
| **n8n** | Workflow automation platform | [n8n.io](https://n8n.io) |
| **Supabase** | PostgreSQL database & APIs | [supabase.com](https://supabase.com) |
| **Retell AI** | AI voice calling | [retellai.com](https://retellai.com) |
| **Google Gemini** | AI text generation | [ai.google.dev](https://ai.google.dev) |
| **Brevo (Sendinblue)** | SMTP email service | [brevo.com](https://brevo.com) |
| **Cal.com** | Calendar booking | [cal.com](https://cal.com) |
| **Vercel** | Backend API hosting | [vercel.com](https://vercel.com) |

### Required API Keys

```env
# Gemini API Server
VERCEL_SERVER_URL=https://your-sendora-server.vercel.app

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_service_role_key

# Retell AI
RETELL_API_KEY=your_retell_api_key
RETELL_AGENT_ID=your_agent_id
RETELL_FROM_NUMBER=+1234567890

# Brevo SMTP
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_brevo_login
EMAIL_PASSWORD=your_brevo_password
ALERT_EMAIL_FROM=your@email.com
ALERT_EMAIL_TO=your@email.com

# Cal.com
CAL_COM_API_KEY=your_cal_api_key
CAL_COM_EVENT_TYPE_ID=your_event_type_id

# n8n (for Retell callbacks)
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.app.n8n.cloud
N8N_API_KEY=your_n8n_api_key
```

---

## 🚀 Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/sendora-ai.git
cd sendora-ai/n8n-workflows
```

### Step 2: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire `Supabase_Schema.sql` file
4. Click **Run** to execute the schema
5. Verify tables were created: `ai_messages`, `api_logs`, `call_metrics`, `daily_call_metrics`, `system_logs`

### Step 3: Import n8n Workflows

#### Method A: Via n8n UI

1. Log into your n8n instance
2. Click **"Workflows"** in the sidebar
3. Click **"Import from File"**
4. Select `Main_Outreach_Workflow.json`
5. Click **"Save"**
6. Repeat for `Call_Analysis_Workflow.json`

#### Method B: Via n8n API

```bash
# Import Main Workflow
curl -X POST https://your-n8n-instance.app.n8n.cloud/api/v1/workflows/import \
  -H "X-N8N-API-KEY: your_api_key" \
  -H "Content-Type: application/json" \
  -d @Main_Outreach_Workflow.json

# Import Call Analysis Workflow
curl -X POST https://your-n8n-instance.app.n8n.cloud/api/v1/workflows/import \
  -H "X-N8N-API-KEY: your_api_key" \
  -H "Content-Type: application/json" \
  -d @Call_Analysis_Workflow.json
```

### Step 4: Configure Retell AI Agent

1. Log into [Retell AI Dashboard](https://app.retellai.com)
2. Go to **Agents** → **Create New Agent**
3. Copy the content from `Retell_AI_Agent_Config.json`
4. Paste into the agent configuration
5. Update the webhook URL to your n8n instance
6. Save and note your `agent_id`

### Step 5: Configure n8n Credentials

#### Supabase Credential

1. In n8n, go to **Credentials** → **Add Credential**
2. Select **Supabase**
3. Enter:
   - **Host**: `xxxxx.supabase.co`
   - **Service Role Key**: Your Supabase service role key

#### SMTP Credential (Brevo)

1. Add **SMTP** credential
2. Enter:
   - **Host**: `smtp-relay.brevo.com`
   - **Port**: `587`
   - **User**: Your Brevo login email
   - **Password**: Your Brevo SMTP key
   - **Secure**: `false`

#### HTTP Header Auth (for APIs)

1. Add **Header Auth** credential for Retell AI
2. Header Name: `Authorization`
3. Header Value: `Bearer YOUR_RETELL_API_KEY`

### Step 6: Update Workflow Variables

Open each imported workflow and replace placeholders:

```javascript
// In Main_Outreach_Workflow.json - Node: "HTTP - Call Gemini API Server"
"url": "https://YOUR-VERCEL-SERVER.vercel.app/generate"
// Change to your actual Vercel URL

// In both workflows - All Supabase nodes
"credentials": {
  "supabaseApi": {
    "id": "1",  // Update to your credential ID
    "name": "Supabase Account"
  }
}

// In Call_Analysis_Workflow.json - Node: "Cal.com - Create Booking"
"eventTypeId": "{{ $env.CAL_COM_EVENT_TYPE_ID }}"
// Ensure this matches your Cal.com event type
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your n8n instance:

```env
# Core Configuration
NODE_ENV=production
N8N_PORT=5678

# Gemini Server
VERCEL_SERVER_URL=https://your-sendora-server.vercel.app
GEMINI_MODEL=gemini-2.5-flash

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Retell AI
RETELL_API_KEY=key_xxxxxxxxxxxxxx
RETELL_AGENT_ID=agent_xxxxxxxxxxxxxx
RETELL_FROM_NUMBER=+12345678900

# Email (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=9ab905001@smtp-brevo.com
EMAIL_PASSWORD=XWdBcJUKws2PpTYE
ALERT_EMAIL_FROM=your@email.com
ALERT_EMAIL_TO=recipient@email.com

# Cal.com
CAL_COM_API_KEY=cal_live_xxxxxxxxxxxxxx
CAL_COM_EVENT_TYPE_ID=123456

# n8n Webhooks
N8N_WEBHOOK_BASE_URL=https://your-instance.app.n8n.cloud
N8N_API_KEY=n8n_api_xxxxxxxxxxxxxx
```

### Webhook URLs

After importing workflows, activate them and note the webhook URLs:

1. **Main Outreach Webhook**: 
   ```
   https://your-n8n.app.n8n.cloud/webhook/outreach-trigger
   ```

2. **Call Analysis Webhook**:
   ```
   https://your-n8n.app.n8n.cloud/webhook/retell-webhook
   ```

3. Update Retell AI agent configuration with the Call Analysis webhook URL

---

## 📚 Workflow Descriptions

### 1. Main Outreach Workflow

**Purpose**: Automates LinkedIn outreach with AI-generated personalized messages

**Input** (POST to webhook):
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Corp",
  "website": "https://acmecorp.com",
  "phone": "+1234567890",
  "LinkedInURL": "https://linkedin.com/in/johndoe",
  "email": "john@acmecorp.com",
  "notes": "Met at SaaS conference"
}
```

**Output**:
- AI-generated 3-message LinkedIn sequence
- Sentiment analysis scores
- Entity extraction data
- Supabase database records
- Email notification sent
- Voice call triggered

**Key Nodes**:
- **webhook-trigger-001**: Entry point for prospect data
- **js-validate-input-002**: Input validation & sanitization
- **webscraper-company-003**: Scrapes company website
- **webscraper-linkedin-004**: Scrapes LinkedIn profile
- **js-format-prompt-005**: Builds enriched AI prompt
- **http-gemini-api-006**: Calls Gemini API via Vercel
- **js-validate-response-007**: Validates AI output
- **python-sentiment-008**: Sentiment analysis
- **python-entity-extraction-009**: Entity extraction
- **supabase-store-messages-010**: Saves to database
- **supabase-log-api-011**: Logs API calls
- **email-send-012**: Sends email via Brevo
- **retell-trigger-call-013**: Initiates voice call
- **error-handler-015**: Error logging

### 2. Call Analysis Workflow

**Purpose**: Processes Retell AI call data, detects intent, and manages follow-ups

**Input** (POST from Retell AI):
```json
{
  "call_id": "call_abc123",
  "call_status": "completed",
  "call_duration": 180,
  "to_number": "+1234567890",
  "from_number": "+0987654321",
  "transcript": "Hi, I'm interested in learning more...",
  "recording_url": "https://...",
  "metadata": {
    "requestId": "req_123",
    "prospectName": "John Doe",
    "companyName": "Acme Corp"
  }
}
```

**Output**:
- Call type classification (human/voicemail/no-answer)
- Intent detection (interested/rejected/booked)
- Cal.com appointment if booked
- Daily metrics updated
- Call report email sent
- Auto-retry if voicemail (max 1 retry)

**Key Nodes**:
- **webhook-retell-001**: Receives Retell callback
- **js-parse-call-data-002**: Detects call type
- **python-tone-analysis-003**: Intent & tone detection
- **if-booked-004**: Routes if appointment booked
- **calcom-book-005**: Creates Cal.com booking
- **if-retry-006**: Checks if retry needed
- **wait-retry-007**: Waits 15 minutes
- **retell-retry-call-008**: Retries the call
- **supabase-store-call-009**: Saves call data
- **supabase-update-metrics-010**: Updates daily stats
- **email-call-report-011**: Sends analysis email
- **error-handler-013**: Error logging

---

## 🔌 API Endpoints

### POST /webhook/outreach-trigger

Triggers the main outreach workflow.

**Request**:
```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "companyName": "TechStart Inc",
    "website": "https://techstart.io",
    "phone": "+19876543210",
    "LinkedInURL": "https://linkedin.com/in/janesmith",
    "email": "jane@techstart.io",
    "notes": "CEO, interested in automation"
  }'
```

**Response**:
```json
{
  "success": true,
  "requestId": "req_1762237847660_644rt09zf",
  "prospectName": "Jane Smith",
  "status": "processing",
  "timestamp": "2025-11-04T06:30:48.236Z"
}
```

### POST /webhook/retell-webhook

Receives Retell AI call completion callbacks (configured in Retell AI agent).

**Request** (from Retell AI):
```json
{
  "call_id": "call_xyz789",
  "call_status": "completed",
  "call_duration": 245,
  "transcript": "Full call transcript here...",
  "disconnect_reason": "user_hangup"
}
```

**Response**:
```json
{
  "success": true,
  "callId": "call_xyz789",
  "intent": "interested",
  "nextAction": "schedule_follow_up"
}
```

---

## 🗄️ Database Schema

### Tables Overview

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `ai_messages` | AI-generated outreach messages | id, input, result, prompt, sentiment_score |
| `api_logs` | API call tracking | request_id, endpoint, latency_ms, key_used |
| `call_metrics` | Detailed call data | call_id, intent, tone, transcript, duration |
| `daily_call_metrics` | Aggregated daily stats | metric_date, total_calls, appointments, pickup_rate |
| `system_logs` | Error & event logging | error_type, severity, context, timestamp |
| `prospects` | Master prospect database | email, company_name, status, lead_score |
| `outreach_campaigns` | Campaign tracking | campaign_name, response_rate, meeting_rate |

### Key Relationships

```
prospects (1) ──── (many) ai_messages
prospects (1) ──── (many) call_metrics
ai_messages (1) ──── (1) api_logs (via request_id)
call_metrics (many) ──── (1) daily_call_metrics (via call_date)
```

### Sample Queries

**Get today's call performance**:
```sql
SELECT * FROM v_daily_call_performance 
WHERE metric_date = CURRENT_DATE;
```

**Find high-performing messages**:
```sql
SELECT * FROM v_recent_successful_outreach
WHERE sentiment_score > 0.7
LIMIT 10;
```

**Check system health**:
```sql
SELECT * FROM v_system_health
WHERE date >= CURRENT_DATE - INTERVAL '7 days';
```

---

## 🧪 Testing

### Test Main Outreach Workflow

```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "companyName": "Test Company",
    "website": "https://example.com",
    "phone": "+15555555555",
    "LinkedInURL": "https://linkedin.com/in/testuser",
    "email": "test@example.com",
    "notes": "Test prospect"
  }'
```

### Test Call Analysis Workflow

```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/retell-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "call_id": "test_call_123",
    "call_status": "completed",
    "call_duration": 120,
    "to_number": "+15555555555",
    "from_number": "+15555555556",
    "transcript": "Yes, I am very interested in booking a demo. When can we schedule?",
    "metadata": {
      "requestId": "test_req_123",
      "prospectName": "Test User",
      "companyName": "Test Company"
    }
  }'
```

### Verify in Supabase

```sql
-- Check if test data was stored
SELECT * FROM ai_messages WHERE prospect_name = 'Test User' ORDER BY timestamp DESC LIMIT 1;

-- Check call metrics
SELECT * FROM call_metrics WHERE call_id = 'test_call_123';

-- Check system logs for errors
SELECT * FROM system_logs WHERE severity = 'error' ORDER BY timestamp DESC LIMIT 5;
```

---

## 🚢 Deployment

### Production Checklist

- [ ] All API keys secured in environment variables
- [ ] Supabase Row Level Security configured
- [ ] n8n workflows activated
- [ ] Retell AI webhooks configured
- [ ] Email templates customized
- [ ] Error monitoring set up (Sentry, LogRocket, etc.)
- [ ] Database backups automated
- [ ] Rate limiting configured
- [ ] GDPR compliance reviewed
- [ ] Documentation updated

### Scaling Considerations

1. **High Volume (1000+ prospects/day)**:
   - Use n8n queue mode
   - Add Redis for caching
   - Scale Supabase to Pro plan
   - Use Cloudflare for DDoS protection

2. **Multiple Regions**:
   - Deploy n8n instances in multiple regions
   - Use Supabase read replicas
   - Configure Retell AI regional numbers

3. **Team Collaboration**:
   - Set up n8n workspaces
   - Use Supabase projects per environment (dev/staging/prod)
   - Implement version control for workflows

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Webhook not triggering

**Problem**: Workflow doesn't execute when webhook is called

**Solution**:
- Ensure workflow is activated (toggle in top-right)
- Check webhook URL is correct (copy from webhook node)
- Verify Content-Type header is `application/json`
- Check n8n logs for incoming requests

#### 2. Gemini API errors

**Problem**: "Model not found" or API timeout

**Solution**:
- Verify Gemini server is running: `https://your-server.vercel.app/health`
- Check model name in .env: `gemini-2.5-flash` (not `gemini-1.5-pro`)
- Test API directly:
  ```bash
  curl -X POST https://your-server.vercel.app/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Test prompt"}'
  ```

#### 3. Supabase connection failed

**Problem**: "Failed to connect to Supabase"

**Solution**:
- Verify service role key (not anon key)
- Check Supabase URL format: `https://xxxxx.supabase.co`
- Ensure IP allowlist includes n8n server IP
- Test connection:
  ```sql
  SELECT 1 FROM ai_messages LIMIT 1;
  ```

#### 4. Email not sending

**Problem**: Brevo SMTP authentication failed

**Solution**:
- Verify SMTP credentials in Brevo dashboard
- Check port is 587 (not 465 or 25)
- Ensure "Secure" is set to `false` in n8n
- Test with simple mail command:
  ```bash
  curl --url 'smtp://smtp-relay.brevo.com:587' \
    --mail-from 'your@email.com' \
    --mail-rcpt 'test@email.com' \
    --user 'your_login:your_password'
  ```

#### 5. Retell AI call not triggered

**Problem**: Voice call doesn't initiate

**Solution**:
- Verify Retell API key is active
- Check agent_id exists in Retell dashboard
- Ensure phone number format is E.164: `+1234567890`
- Check Retell account has credits
- Review Retell logs in dashboard

#### 6. Python nodes failing

**Problem**: "Python execution error"

**Solution**:
- Ensure Python 3.8+ is installed on n8n instance
- Check Python libraries are available (n8n cloud includes them)
- Test Python code locally first
- Add error logging:
  ```python
  try:
      # your code
  except Exception as e:
      return {"error": str(e)}
  ```

#### 7. Web scraping returns empty data

**Problem**: WebScraper nodes return no data

**Solution**:
- Check if website allows scraping (robots.txt)
- Verify CSS selectors are correct (inspect page source)
- Add timeout: `options.timeout = 10000`
- Use alternative selectors or XPath
- Consider using proxy for rate-limited sites

### Debug Mode

Enable verbose logging in n8n:

```env
N8N_LOG_LEVEL=debug
N8N_LOG_OUTPUT=console,file
N8N_LOG_FILE_LOCATION=/var/log/n8n/
```

### Getting Help

- **n8n Community**: [community.n8n.io](https://community.n8n.io)
- **Retell AI Support**: support@retellai.com
- **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues**: Open an issue in this repo

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Credits

Built with:
- [n8n](https://n8n.io) - Workflow automation
- [Supabase](https://supabase.com) - Database & APIs
- [Retell AI](https://retellai.com) - Voice AI
- [Google Gemini](https://ai.google.dev) - AI generation
- [Brevo](https://brevo.com) - Email service
- [Cal.com](https://cal.com) - Scheduling

---

## 📞 Support

For enterprise support, custom development, or consulting:
- Email: support@sendoraai.com
- Website: https://sendoraai.com
- Discord: https://discord.gg/sendoraai

---

**Happy Automating! 🚀**

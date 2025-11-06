# 🚀 Sendora AI - Complete System

> AI-Powered LinkedIn Outreach Automation with Real-time Analytics

## 🌐 **PUBLIC DEPLOYMENTS**

### 📡 **Part 1: Gemini API Backend**
**Live URL:** https://sendo-fde4b527a-bhargav-dhamshettys-projects.vercel.app

**Endpoints:**
- `POST /generate` - Generate AI content with key rotation
- `GET /health` - Check system health
- `GET /stats` - View API usage statistics
- `POST /test-email` - Test email functionality

**Try it now:**
```bash
curl -X POST https://sendo-fde4b527a-bhargav-dhamshettys-projects.vercel.app/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a professional LinkedIn message", "maxTokens": 500}'
```

---

### 🤖 **Part 2: n8n Workflow Automation**
**n8n Editor:** https://ram123499.app.n8n.cloud/workflow/02XEodQU2yh4OQhQ

**Webhook Trigger:** https://ram123499.app.n8n.cloud/webhook/outreach-trigger

**Features:**
- ✅ Automated LinkedIn outreach
- ✅ AI-powered message generation
- ✅ 5 professional fallback templates
- ✅ Sentiment analysis
- ✅ Email notifications via Brevo SMTP

**Trigger workflow:**
```bash
curl -X POST https://ram123499.app.n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Tech Corp",
    "linkedinUrl": "https://linkedin.com/in/johndoe"
  }'
```

---

### 📊 **Part 3: Analytics Dashboard**
**Live Dashboard:** https://sendora-dashboard-6ap7kqnlj-bhargav-dhamshettys-projects.vercel.app

**Features:**
- ✅ Real-time call metrics
- ✅ Interactive charts (Line & Bar)
- ✅ Recent calls table
- ✅ System logs viewer at `/logs`
- ✅ Success rate analytics
- ✅ Sentiment analysis visualization

**Pages:**
- `/` - Main analytics dashboard with charts
- `/logs` - System logs and error tracking

---

## 📦 **Source Code**
**GitHub Repository:** https://github.com/Bhargav-Dhamshetty/sendoai

**Structure:**
```
sendoai/
├── api/              # Gemini API Backend (Vercel)
├── n8n-workflows/    # n8n Automation Workflows
├── dashboard/        # Analytics Dashboard (Next.js)
└── README.md         # This file
```

---

## 🗄️ **Database**
**Supabase Project:** https://supabase.com/dashboard/project/bmpteadatirqfaweykns

**Tables:**
- `call_metrics` - Individual call records
- `daily_call_metrics` - Aggregated daily statistics
- `system_logs` - Error tracking and monitoring

---

## 🔧 **Technology Stack**

### Backend (Part 1)
- Node.js + Express
- Google Gemini AI (10 API keys with rotation)
- Vercel Serverless Functions
- Nodemailer (Brevo SMTP)

### Automation (Part 2)
- n8n Cloud
- Webhook triggers
- Supabase integration
- Email automation

### Dashboard (Part 3)
- Next.js 14
- TypeScript
- TailwindCSS
- Recharts (Data visualization)
- Supabase (PostgreSQL)

---

## 📈 **System Architecture**

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Webhook   │────▶│ n8n Workflow │────▶│   Gemini    │
│   Trigger   │     │  Automation  │     │  API (10x)  │
└─────────────┘     └──────┬───────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Supabase   │
                    │  Database   │
                    └──────┬──────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Dashboard  │
                    │  Analytics  │
                    └─────────────┘
```

---

## 🎯 **Use Cases**

1. **LinkedIn Outreach Automation**
   - Trigger workflow with prospect data
   - AI generates personalized messages
   - Automatic email delivery
   - Track success metrics

2. **Analytics & Monitoring**
   - Real-time call tracking
   - Success rate analysis
   - Sentiment monitoring
   - Error logging

3. **AI Content Generation**
   - Professional message writing
   - Multiple fallback options
   - Context-aware generation
   - High availability (10 API keys)

---

## 🚀 **Quick Start**

### Test the API
```bash
# Health check
curl https://sendo-fde4b527a-bhargav-dhamshettys-projects.vercel.app/health

# Generate content
curl -X POST https://sendo-fde4b527a-bhargav-dhamshettys-projects.vercel.app/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a LinkedIn outreach message"}'
```

### View Analytics
Open: https://sendora-dashboard-6ap7kqnlj-bhargav-dhamshettys-projects.vercel.app

### Trigger Workflow
```bash
curl -X POST https://ram123499.app.n8n.cloud/webhook/outreach-trigger \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Test", "companyName": "Demo Corp"}'
```

---

## 📊 **Current Status**

✅ **All Systems Operational**

- Backend API: **LIVE** (10 Gemini keys active)
- n8n Workflow: **LIVE** (webhook ready)
- Dashboard: **LIVE** (charts & analytics)
- Database: **CONNECTED** (Supabase)
- Monitoring: **ACTIVE** (system logs)

---

## 🔐 **Security**

- ✅ API keys stored as Vercel environment variables
- ✅ Service role keys secured
- ✅ CORS enabled for dashboard
- ✅ `.env` files excluded from Git
- ✅ Rate limiting on API endpoints

---

## 📧 **Support**

**Email:** mechconect18@gmail.com

**Issues:** https://github.com/Bhargav-Dhamshetty/sendoai/issues

---

## 📝 **License**

MIT License - Free to use and modify

---

## 🎉 **Credits**

Built with ❤️ using:
- Google Gemini AI
- n8n Cloud
- Vercel
- Supabase
- Next.js

---

**Last Updated:** November 6, 2025

**Version:** 1.0.0 - Complete System Deployed

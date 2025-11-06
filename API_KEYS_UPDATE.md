# 🎯 API Keys Updated Successfully

## ✅ Configured API Keys

### Retell AI
- **API Key**: `key_1720a8a5a88c17a3d86bdee2b420`
- **Status**: ✅ Updated in `.env.n8n`

### Cal.com
- **API Key**: `cal_live_cb45b03bd46f8c05163beb474b12cbcb`
- **Status**: ✅ Updated in:
  - `.env.n8n`
  - `Call_Analysis_Workflow.json` (Cal.com - Create Booking node)

---

## 🔧 Next Steps in n8n

### 1. Create Retell API Auth Credential

1. Go to n8n → **Credentials** → **+ Add Credential**
2. Search for "HTTP Header Auth"
3. Configure:
   - **Name**: `Retell API Auth`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer key_1720a8a5a88c17a3d86bdee2b420`
4. Click **Save**

### 2. Verify Cal.com Configuration

The Cal.com API key is now embedded in the workflow. However, you still need to provide:

**⚠️ Required: Cal.com Event Type ID**

To get your Event Type ID:
1. Go to https://app.cal.com/event-types
2. Click on your event type (e.g., "15 Min Meeting")
3. Copy the ID from the URL or settings page
4. Update in `Call_Analysis_Workflow.json` line 91:
   - Replace: `"value": "YOUR_CAL_COM_EVENT_TYPE_ID"`
   - With: `"value": "YOUR_ACTUAL_EVENT_ID"` (e.g., `"12345"`)

### 3. Configure Retell AI Webhook

In Retell AI Dashboard:
1. Go to **Agents**
2. Edit agent: `agent_ea295365c16d68879208dc6bba`
3. Set **End-of-Call Webhook URL**: 
   ```
   https://ram123499.app.n8n.cloud/webhook/retell-webhook
   ```
4. Save changes

---

## ⚠️ Still Need (From Previous Setup)

### Retell Phone Number
**Location**: Both workflow files

Current placeholder: `+1YOUR_RETELL_PHONE`

**Action**: Replace with your Retell registered phone number (e.g., `+15551234567`)

### Cal.com Event Type ID
**Location**: `Call_Analysis_Workflow.json` line 91

Current placeholder: `YOUR_CAL_COM_EVENT_TYPE_ID`

**Action**: Replace with your actual Event Type ID from Cal.com

---

## 📋 Quick Test

Once you've completed the above:

```powershell
# Test the webhook
$body = @{
    linkedinUrl = "https://www.linkedin.com/in/example-profile"
    phoneNumber = "+1234567890"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://ram123499.app.n8n.cloud/webhook/linkedin-outreach" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## ✅ Configuration Status

| Service | API Key | Status | Notes |
|---------|---------|--------|-------|
| Retell AI | ✅ Configured | Ready | Need to create credential in n8n |
| Cal.com | ✅ Configured | Partial | Need Event Type ID |
| Supabase | ✅ Configured | Ready | Already set up |
| Brevo SMTP | ✅ Configured | Ready | Already working |

**You're almost there! 🚀**

Complete the steps above and your system will be fully operational.

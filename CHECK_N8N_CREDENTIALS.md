# 🔍 N8N CREDENTIAL TROUBLESHOOTING GUIDE

## ❌ PROBLEM: Emails Not Arriving (HTTP 200 OK but no emails)

### 🎯 ROOT CAUSE
Your n8n workflow is looking for a credential with the **EXACT** name:
```
Brevo SMTP Connection
```

If your credential has a different name (even one character different), the email node will **fail silently**.

---

## ✅ SOLUTION: Verify & Fix Credential Names

### STEP 1: Open N8N Credentials Page
🔗 **URL:** https://ram123499.app.n8n.cloud/credentials

---

### STEP 2: Check These 3 Credentials

#### 1️⃣ **SMTP Email Credential**
**Required Name:** `Brevo SMTP Connection` (EXACT match!)

**Settings:**
- **Type:** SMTP
- **Host:** `smtp-relay.brevo.com`
- **Port:** `587`
- **Security:** `STARTTLS`
- **User:** `mechconect18@gmail.com`
- **Password:** Your Brevo SMTP API key

**How to get Brevo SMTP key:**
1. Go to: https://app.brevo.com/settings/keys/smtp
2. Login with mechconect18@gmail.com
3. Copy the SMTP key (starts with `xsmtpsib-`)

---

#### 2️⃣ **Supabase Credential**
**Required Name:** `Supabase Connection` (EXACT match!)

**Settings:**
- **Type:** Supabase
- **Host:** `https://bmpteadatirqfaweykns.supabase.co`
- **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcHRlYWRhdGlycWZhd2V5a25zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDcyMDMyMCwiZXhwIjoyMDQ2Mjk2MzIwfQ.VXSbC-W75TRlXiIoaB3GYGFa2sNGM99eR4xBW1-gqaw`

---

#### 3️⃣ **Retell API Credential**
**Required Name:** `Retell API Auth` (EXACT match!)

**Settings:**
- **Type:** Header Auth
- **Header Name:** `Authorization`
- **Header Value:** `Bearer key_1720a8a5c1b340a5a19c6c37bf12ae49`

---

## 🧪 TESTING PROCEDURE

### After fixing credential names, run this test:

```powershell
# Navigate to project folder
cd C:\Users\Abhishek\sendo

# Run complete test
powershell -ExecutionPolicy Bypass -File .\RUN_COMPLETE_TEST.ps1
```

### Expected Result:
```
✅ WORKFLOW EXECUTED! Status: 200
✅ Email sent to: godbhargav@gmail.com
```

### Check Email:
- **Email:** godbhargav@gmail.com
- **Wait:** 1-2 minutes
- **Check:** Inbox AND Spam folder
- **Expected:** 2 emails

---

## 🔧 COMMON MISTAKES TO AVOID

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `Brevo SMTP` | `Brevo SMTP Connection` |
| `brevo smtp connection` | `Brevo SMTP Connection` |
| `Brevo  SMTP Connection` (extra space) | `Brevo SMTP Connection` |
| `Supabase` | `Supabase Connection` |
| `Retell API` | `Retell API Auth` |

**EXACT capitalization and spacing required!**

---

## 🎯 QUICK VERIFICATION CHECKLIST

Before running test, verify:

- [ ] Credential name: `Brevo SMTP Connection` (exact)
- [ ] Host: `smtp-relay.brevo.com`
- [ ] Port: `587`
- [ ] User: `mechconect18@gmail.com`
- [ ] Password: Valid Brevo SMTP key
- [ ] Security: STARTTLS
- [ ] Credential is SAVED (not just created)

---

## 📞 IF STILL NOT WORKING

Check n8n execution logs:
1. Go to: https://ram123499.app.n8n.cloud/workflows
2. Click on "Main_Outreach_Workflow"
3. Click "Executions" tab
4. Find the latest execution
5. Look for red error icons on the email node

**Common error message:**
```
"Credentials for 'Brevo SMTP Connection' not found"
```

This confirms the credential name doesn't match!

---

## 🚀 FINAL TEST COMMAND

After fixing everything:

```powershell
# Complete end-to-end test
powershell -File .\RUN_COMPLETE_TEST.ps1

# Then check:
# 1. Email: godbhargav@gmail.com
# 2. Wait: 2 minutes
# 3. Look in: Inbox + Spam
```

---

**Need help?** Share a screenshot of your n8n credentials page!

# 🔧 N8N CREDENTIALS SETUP - REQUIRED FOR EMAIL!

## ⚠️ CRITICAL: Emails Won't Send Without Credentials!

Your workflows are running (HTTP 200 OK) but **emails fail silently** because credentials don't exist in n8n.

---

## 📋 STEP-BY-STEP CREDENTIAL SETUP

### **1. BREVO SMTP CONNECTION** (Required for emails)

**Go to:** https://ram123499.app.n8n.cloud/credentials

1. Click **"Add Credential"** button (top right)
2. Search for: **"SMTP"**
3. Select: **SMTP Account**
4. Fill in:

```
Credential Name: Brevo SMTP Connection
Host: smtp-relay.brevo.com
Port: 587
Security: STARTTLS (or SSL/TLS)
User: mechconect18@gmail.com
Password: xkeysib-7af44e66c20f9a06e35de01f8924cb2eb1b3a7c99e3e6d8ef56709cb0f98765-example
```

5. Click **"Test"** to verify connection
6. Click **"Save"**

---

### **2. SUPABASE CONNECTION** (Required for database)

1. Click **"Add Credential"** button
2. Search for: **"Supabase"**
3. Select: **Supabase API**
4. Fill in:

```
Credential Name: Supabase Connection
Host: https://bmpteadatirqfaweykns.supabase.co
Service Role Secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcHRlYWRhdGlycWZhd2V5a25zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDYzODg3NCwiZXhwIjoyMDQ2MjE0ODc0fQ.ye4I0Wc1zS2zo24gGqEoR6V_93hyn_HEAoezVxgs0fI
```

5. Click **"Test"** to verify connection
6. Click **"Save"**

---

### **3. RETELL API AUTH** (Required for voice calls)

1. Click **"Add Credential"** button
2. Search for: **"HTTP Header Auth"**
3. Select: **Header Auth**
4. Fill in:

```
Credential Name: Retell API Auth
Name: Authorization
Value: Bearer key_1720a8a5a88c17a3d86bdee2b4209cfc84b0c8f2e3c3d5e9f0a1b2c3d4e5f6g7
```

5. Click **"Save"**

---

## ✅ VERIFY CREDENTIALS CREATED

After creating all 3 credentials, you should see:

```
✓ Brevo SMTP Connection
✓ Supabase Connection  
✓ Retell API Auth
```

Go to: https://ram123499.app.n8n.cloud/credentials

---

## 🔄 RE-TEST WORKFLOWS

After creating credentials, run this command:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\Abhishek\sendo\RUN_COMPLETE_TEST.ps1"
```

**Expected result:**
- ✅ HTTP 200 OK
- ✅ 2 emails sent to godbhargav@gmail.com
- ✅ Data in Supabase tables

---

## 📧 CHECK EMAIL DELIVERY

After re-running test:

1. **Wait 1-2 minutes** for email delivery
2. **Check inbox:** godbhargav@gmail.com
3. **Check spam folder** if not in inbox
4. **Look for:**
   - Email 1: "Your Personalized LinkedIn Outreach - TechCorp"
   - Email 2: "Call Completed: BOOKED - John Doe"

---

## 🆘 TROUBLESHOOTING

### **If emails still don't arrive:**

1. **Check n8n execution logs:**
   - https://ram123499.app.n8n.cloud/executions
   - Click recent execution
   - Look for red error nodes
   - Check email node for error message

2. **Verify Brevo SMTP credential:**
   - Go to credentials page
   - Click "Brevo SMTP Connection"
   - Click "Test" button
   - Should show "Connection successful"

3. **Check Brevo account:**
   - Login to: https://app.brevo.com
   - Verify API key is active
   - Check sending limits

4. **Verify email address:**
   - Confirm godbhargav@gmail.com is correct
   - Check Gmail spam/promotions folders

---

## 🎯 QUICK FIX CHECKLIST

- [ ] Created "Brevo SMTP Connection" credential
- [ ] Created "Supabase Connection" credential  
- [ ] Created "Retell API Auth" credential
- [ ] Tested SMTP connection (green checkmark)
- [ ] Re-imported workflows to n8n
- [ ] Activated both workflows (green toggle)
- [ ] Re-ran test script
- [ ] Checked email inbox + spam folder

---

## 📞 NEXT STEPS

1. **Create the 3 credentials above** (5 minutes)
2. **Run:** `RUN_COMPLETE_TEST.ps1`
3. **Check email:** godbhargav@gmail.com
4. **Verify data:** Supabase dashboard

**Once credentials are created, emails will work!** ✅

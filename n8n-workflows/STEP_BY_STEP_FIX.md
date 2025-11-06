# 🎯 STEP-BY-STEP FIX (Visual Guide)

## Problem: "Please resolve outstanding issues before you activate it"

### ✅ Solution: Import Fixed Workflows & Add Credentials

---

## 📋 **3-MINUTE FIX**

### **STEP 1: Delete Old Workflows in n8n** (30 seconds)

```
In n8n dashboard:
┌─────────────────────────────────────┐
│ Sendora AI - LinkedIn...  [⋯]      │  ← Click ⋯
│   └─ Delete                         │  ← Click Delete
│                                     │
│ Sendora AI - Call...      [⋯]      │  ← Click ⋯
│   └─ Delete                         │  ← Click Delete
└─────────────────────────────────────┘
```

---

### **STEP 2: Import Fixed Workflows** (30 seconds)

```
Click: [+ New Workflow]
Click: [⋯ Menu] → "Import from File"
Select: Main_Outreach_Workflow.json
Click: [Import]

Repeat:
Click: [+ New Workflow]
Click: [⋯ Menu] → "Import from File"
Select: Call_Analysis_Workflow.json
Click: [Import]
```

---

### **STEP 3: Create Credentials** (1 minute)

#### **A. Create Supabase Credential:**

```
Sidebar → [Credentials] → [+ Add Credential]
Search: "Supabase"
┌───────────────────────────────────────────┐
│ Host: bmpteadatirqfaweykns.supabase.co   │
│                                           │
│ Service Role Key:                         │
│ eyJhbGci...3GCs                          │
│                                           │
│ [Test Connection] → ✅ Success            │
│                                           │
│ Name: Supabase Account                    │
│                                           │
│ [Save]                                    │
└───────────────────────────────────────────┘
```

#### **B. Create SMTP Credential:**

```
Sidebar → [Credentials] → [+ Add Credential]
Search: "SMTP"
┌───────────────────────────────────────────┐
│ Host: smtp-relay.brevo.com                │
│ Port: 587                                 │
│ User: 9ab905001@smtp-brevo.com            │
│ Password: XWdBcJUKws2PpTYE                │
│ Secure: false                             │
│                                           │
│ [Test Connection] → ✅ Success            │
│                                           │
│ Name: Brevo SMTP                          │
│                                           │
│ [Save]                                    │
└───────────────────────────────────────────┘
```

---

### **STEP 4: Add Credentials to Nodes** (1 minute)

Open: **Main_Outreach_Workflow**

#### **Click each node with ⚠️ warning:**

```
Node: "Supabase - Store AI Messages"
┌───────────────────────────────────────────┐
│ Credential to connect with:               │
│ [Select...] ▼                             │
│   ┌─────────────────────────────┐         │
│   │ ✓ Supabase Account          │ ← Select
│   └─────────────────────────────┘         │
│                                           │
│ [Save]                                    │
└───────────────────────────────────────────┘
```

**Repeat for these nodes:**
- [ ] Supabase - Store AI Messages
- [ ] Supabase - Log API Calls
- [ ] Error Handler - Log to Supabase

```
Node: "Email - Send via Brevo SMTP"
┌───────────────────────────────────────────┐
│ Credential to connect with:               │
│ [Select...] ▼                             │
│   ┌─────────────────────────────┐         │
│   │ ✓ Brevo SMTP                │ ← Select
│   └─────────────────────────────┘         │
│                                           │
│ [Save]                                    │
└───────────────────────────────────────────┘
```

---

Open: **Call_Analysis_Workflow**

**Repeat for these nodes:**
- [ ] Supabase - Store Call Data
- [ ] Supabase - Update Daily Metrics
- [ ] Error Handler - Log Errors
- [ ] Email - Send Call Report

---

### **STEP 5: Activate** (10 seconds)

```
In workflow editor (top right):
┌──────────────────────────────┐
│ [ Active ] ← Click toggle    │
│   OFF → ON                   │
└──────────────────────────────┘

Should see:
✅ "Workflow activated successfully"
```

---

## ✅ **DONE!**

Your workflows are now:
- ✅ Imported with NO hardcoded credential IDs
- ✅ Connected to YOUR Supabase + SMTP credentials
- ✅ Ready to activate without errors!

---

## 🎯 **Quick Checklist:**

```
Before Activating:
☐ All nodes have green checkmark (no ⚠️)
☐ No red error icons
☐ Workflow saved (Ctrl+S)
☐ Credentials tested successfully

Ready to Activate:
☑ Everything above completed
☐ Toggle "Active" switch
☐ See "Workflow activated successfully"
```

---

## 🚀 **Test Your Workflow:**

```powershell
# Make sure Gemini server is running:
cd C:\Users\Abhishek\sendo
node server.js

# In another terminal, test webhook:
curl -X POST http://localhost:5678/webhook/outreach-trigger `
  -H "Content-Type: application/json" `
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "companyName":"Test Corp",
    "website":"https://example.com",
    "phone":"+15555555555",
    "LinkedInURL":"https://linkedin.com/in/test",
    "email":"test@example.com",
    "notes":"Test"
  }'
```

**Expected:**
- ✅ Workflow executes successfully
- ✅ Data stored in Supabase
- ✅ Email sent to your inbox
- ✅ No errors in n8n execution log

---

**Problem solved! Your workflows are ready! 🎉**

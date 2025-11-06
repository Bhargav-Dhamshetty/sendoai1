// ═══════════════════════════════════════════════════════════
// SENDORA AI - COMPLETE SYSTEM TEST
// ═══════════════════════════════════════════════════════════

const https = require('https');

// Test Configuration
const SUPABASE_URL = 'https://bmpteadatirqfaweykns.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcHRlYWRhdGlycWZhd2V5a25zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI0MjI5MCwiZXhwIjoyMDc3ODE4MjkwfQ.c0jA31LRyZMjN22Qbk6ioynQTbeg1oJWvG38rHS3GCs';

const WEBHOOK_OUTREACH = 'https://ram123499.app.n8n.cloud/webhook/outreach-trigger';
const WEBHOOK_RETELL = 'https://ram123499.app.n8n.cloud/webhook/retell-webhook';

// ═══════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════

function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (url.includes('supabase.co')) {
      options.headers['apikey'] = SUPABASE_KEY;
      options.headers['Authorization'] = `Bearer ${SUPABASE_KEY}`;
    }

    if (data) {
      const payload = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body,
          headers: res.headers
        });
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// ═══════════════════════════════════════════════════════════
// Test 1: Check Supabase Tables
// ═══════════════════════════════════════════════════════════

async function testSupabaseTables() {
  console.log('\n🔍 TEST 1: Checking Supabase Tables...\n');
  
  const tables = ['prospects', 'call_metrics', 'system_logs', 'calls', 'metrics'];
  
  for (const table of tables) {
    try {
      const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`;
      const response = await makeRequest(url, 'GET');
      
      if (response.statusCode === 200) {
        console.log(`✅ Table "${table}" exists and is accessible`);
      } else {
        console.log(`❌ Table "${table}" - Status: ${response.statusCode}`);
        console.log(`   Response: ${response.body}`);
      }
    } catch (error) {
      console.log(`❌ Table "${table}" - Error: ${error.message}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// Test 2: Insert Test Data into Supabase
// ═══════════════════════════════════════════════════════════

async function testSupabaseInsert() {
  console.log('\n📝 TEST 2: Inserting Test Data into Supabase...\n');
  
  // Test prospects table
  try {
    const testProspect = {
      request_id: `test-${Date.now()}`,
      linkedin_url: 'https://www.linkedin.com/in/test-user',
      name: 'Test User',
      title: 'Test Engineer',
      company: 'Test Company',
      sentiment_score: 0.85,
      engagement_level: 'high',
      contact_priority: 9
    };
    
    const url = `${SUPABASE_URL}/rest/v1/prospects`;
    const response = await makeRequest(url, 'POST', testProspect);
    
    if (response.statusCode === 201 || response.statusCode === 200) {
      console.log('✅ Successfully inserted test prospect');
      console.log(`   Request ID: ${testProspect.request_id}`);
    } else {
      console.log(`❌ Failed to insert prospect - Status: ${response.statusCode}`);
      console.log(`   Response: ${response.body}`);
    }
  } catch (error) {
    console.log(`❌ Supabase insert error: ${error.message}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Test 3: Test Main Outreach Webhook
// ═══════════════════════════════════════════════════════════

async function testOutreachWebhook() {
  console.log('\n🔗 TEST 3: Testing Main Outreach Webhook...\n');
  
  const payload = {
    linkedinUrl: 'https://www.linkedin.com/in/satya-nadella',
    phoneNumber: '+15551234567'
  };
  
  try {
    const response = await makeRequest(WEBHOOK_OUTREACH, 'POST', payload);
    console.log(`Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('✅ Main Outreach Workflow triggered successfully');
      console.log(`   Response: ${response.body || '(empty response)'}`);
    } else {
      console.log('❌ Webhook failed');
      console.log(`   Response: ${response.body}`);
    }
  } catch (error) {
    console.log(`❌ Webhook error: ${error.message}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Test 4: Test Call Analysis Webhook
// ═══════════════════════════════════════════════════════════

async function testCallWebhook() {
  console.log('\n📞 TEST 4: Testing Call Analysis Webhook...\n');
  
  const payload = {
    call_id: `test-call-${Date.now()}`,
    request_id: `test-req-${Date.now()}`,
    call_status: 'completed',
    call_type: 'outbound',
    duration: 180,
    transcript: 'This is a test call transcript. The prospect showed high interest in our product.',
    recording_url: 'https://example.com/recording-test.mp3',
    to_number: '+15551234567',
    metadata: {
      prospect_name: 'Test Prospect',
      company_name: 'Test Company',
      email: 'godbhargav@gmail.com'
    },
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await makeRequest(WEBHOOK_RETELL, 'POST', payload);
    console.log(`Status: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('✅ Call Analysis Workflow triggered successfully');
      console.log('   Check your email for the call report!');
    } else {
      console.log('❌ Webhook failed');
      console.log(`   Response: ${response.body}`);
    }
  } catch (error) {
    console.log(`❌ Webhook error: ${error.message}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Test 5: Verify Data in Supabase
// ═══════════════════════════════════════════════════════════

async function verifySupabaseData() {
  console.log('\n🔍 TEST 5: Verifying Data in Supabase...\n');
  
  const tables = ['prospects', 'call_metrics'];
  
  for (const table of tables) {
    try {
      const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc&limit=3`;
      const response = await makeRequest(url, 'GET');
      
      if (response.statusCode === 200) {
        const data = JSON.parse(response.body);
        console.log(`✅ Table "${table}" - Found ${data.length} recent records`);
        if (data.length > 0) {
          console.log(`   Latest record: ${JSON.stringify(data[0]).substring(0, 100)}...`);
        }
      } else {
        console.log(`❌ Table "${table}" - Status: ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`❌ Table "${table}" - Error: ${error.message}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// Run All Tests
// ═══════════════════════════════════════════════════════════

async function runAllTests() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🚀 SENDORA AI - COMPLETE SYSTEM TEST');
  console.log('════════════════════════════════════════════════════════════');
  
  await testSupabaseTables();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testSupabaseInsert();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await testOutreachWebhook();
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await testCallWebhook();
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await verifySupabaseData();
  
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('✅ ALL TESTS COMPLETED');
  console.log('════════════════════════════════════════════════════════════');
  console.log('\n📋 Next Steps:');
  console.log('1. Check n8n execution history for workflow runs');
  console.log('2. Check Supabase tables for inserted data');
  console.log('3. Check email inbox (godbhargav@gmail.com) for reports');
  console.log('4. If tables are missing, run: setup-supabase-tables.sql');
  console.log('\n');
}

// Run tests
runAllTests().catch(console.error);

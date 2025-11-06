/**
 * Simple Test Script for Sendora AI Server
 * Tests the /generate endpoint with a sample prompt
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testGenerateEndpoint() {
  console.log('🧪 Testing /generate endpoint...\n');

  try {
    const response = await axios.post(`${BASE_URL}/generate`, {
      prompt: 'Write a haiku about coding in JavaScript'
    });

    console.log('✅ Success!');
    console.log('\n📊 Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
    console.log('\n🔑 Key Used:', response.data.keyUsed);
    console.log('⏱️  Duration:', response.data.duration);
    console.log('📝 Response Length:', response.data.response.length, 'characters');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testHealthEndpoint() {
  console.log('\n🏥 Testing /health endpoint...\n');

  try {
    const response = await axios.get(`${BASE_URL}/health`);
    
    console.log('✅ Health Check:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testStatsEndpoint() {
  console.log('\n📊 Testing /stats endpoint...\n');

  try {
    const response = await axios.get(`${BASE_URL}/stats`);
    
    console.log('✅ Statistics:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════');
  console.log('  Sendora AI - Server Test Suite');
  console.log('═══════════════════════════════════════\n');

  await testHealthEndpoint();
  await testGenerateEndpoint();
  await testStatsEndpoint();

  console.log('\n═══════════════════════════════════════');
  console.log('  Tests Complete!');
  console.log('═══════════════════════════════════════\n');
}

// Run tests
runTests().catch(console.error);

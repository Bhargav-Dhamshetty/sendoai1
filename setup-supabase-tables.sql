-- ═══════════════════════════════════════════════════════════
-- SENDORA AI - SUPABASE TABLE CREATION SCRIPT
-- ═══════════════════════════════════════════════════════════
-- Run this in: Supabase SQL Editor
-- Project: bmpteadatirqfaweykns
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════
-- TABLE 1: prospects
-- Stores LinkedIn profile data from Main Outreach Workflow
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id TEXT UNIQUE NOT NULL,
  linkedin_url TEXT,
  name TEXT,
  title TEXT,
  company TEXT,
  location TEXT,
  about TEXT,
  sentiment_score NUMERIC,
  engagement_level TEXT,
  contact_priority NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_prospects_request_id ON prospects(request_id);
CREATE INDEX IF NOT EXISTS idx_prospects_created_at ON prospects(created_at DESC);

-- ═══════════════════════════════════════════════════════════
-- TABLE 2: call_metrics
-- Stores Retell AI call data and analysis results
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS call_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_id TEXT UNIQUE,
  request_id TEXT,
  prospect_name TEXT,
  company_name TEXT,
  to_number TEXT,
  call_status TEXT,
  call_type TEXT,
  duration INTEGER,
  transcript TEXT,
  recording_url TEXT,
  tone TEXT,
  intent TEXT,
  confidence NUMERIC,
  sentiment_score NUMERIC,
  engagement_level TEXT,
  retry_attempt INTEGER DEFAULT 0,
  timestamp TIMESTAMP,
  call_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_call_metrics_call_id ON call_metrics(call_id);
CREATE INDEX IF NOT EXISTS idx_call_metrics_request_id ON call_metrics(request_id);
CREATE INDEX IF NOT EXISTS idx_call_metrics_call_date ON call_metrics(call_date DESC);

-- ═══════════════════════════════════════════════════════════
-- TABLE 3: system_logs
-- Error tracking and system monitoring
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id TEXT,
  error_type TEXT,
  error_message TEXT,
  error_stack TEXT,
  context JSONB,
  timestamp TIMESTAMP,
  severity TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_system_logs_severity ON system_logs(severity);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at DESC);

-- ═══════════════════════════════════════════════════════════
-- TABLE 4: calls (simplified for basic tracking)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requestId TEXT,
  prospectName TEXT,
  companyName TEXT,
  call_duration INT,
  transcript TEXT,
  recording_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- TABLE 5: metrics (daily aggregations)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS metrics (
  date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
  total_calls INT DEFAULT 0,
  avg_duration FLOAT DEFAULT 0
);

-- ═══════════════════════════════════════════════════════════
-- TABLE 6: daily_call_metrics (for aggregation workflow)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS daily_call_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE UNIQUE NOT NULL,
  total_calls INT DEFAULT 0,
  pickups INT DEFAULT 0,
  rejections INT DEFAULT 0,
  appointments INT DEFAULT 0,
  avg_duration FLOAT DEFAULT 0,
  avg_confidence FLOAT DEFAULT 0,
  pickup_rate FLOAT DEFAULT 0,
  appointment_rate FLOAT DEFAULT 0,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster date lookups
CREATE INDEX IF NOT EXISTS idx_daily_call_metrics_date ON daily_call_metrics(metric_date DESC);

-- ═══════════════════════════════════════════════════════════
-- VERIFICATION QUERY
-- ═══════════════════════════════════════════════════════════
-- Run this to verify all tables were created:
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('prospects', 'call_metrics', 'system_logs', 'calls', 'metrics', 'daily_call_metrics')
ORDER BY table_name;

-- ═══════════════════════════════════════════════════════════
-- GRANT PERMISSIONS (if needed)
-- ═══════════════════════════════════════════════════════════
-- Grant access to service_role
GRANT ALL ON prospects TO service_role;
GRANT ALL ON call_metrics TO service_role;
GRANT ALL ON system_logs TO service_role;
GRANT ALL ON calls TO service_role;
GRANT ALL ON metrics TO service_role;
GRANT ALL ON daily_call_metrics TO service_role;

-- ═══════════════════════════════════════════════════════════
-- SUCCESS MESSAGE
-- ═══════════════════════════════════════════════════════════
-- If no errors appear, all tables are created successfully!
-- Check Database → Tables in Supabase UI to verify.

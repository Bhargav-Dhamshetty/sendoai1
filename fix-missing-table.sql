-- ═══════════════════════════════════════════════════════════
-- QUICK FIX: Add missing daily_call_metrics table
-- ═══════════════════════════════════════════════════════════
-- Run this immediately in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- Create the missing daily_call_metrics table
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

-- Add index
CREATE INDEX IF NOT EXISTS idx_daily_call_metrics_date ON daily_call_metrics(metric_date DESC);

-- Grant permissions
GRANT ALL ON daily_call_metrics TO service_role;

-- Verify the table exists
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name = 'daily_call_metrics';

-- ═══════════════════════════════════════════════════════════
-- If you see 1 row with 'daily_call_metrics' - SUCCESS!
-- ═══════════════════════════════════════════════════════════

-- Money Tracker Database Setup Script
-- Run this in Supabase SQL Editor

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,              -- Clerk user ID (string format)
  amount NUMERIC NOT NULL CHECK (amount > 0),
  category TEXT NOT NULL CHECK (
    category IN (
      '食費',
      '日用品',
      '交通費',
      '娯楽',
      '衣服・美容',
      '医療・健康',
      '住居費',
      '通信費',
      'その他'
    )
  ),
  date DATE NOT NULL,                  -- Date of expense
  note TEXT,                           -- Optional note
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at DESC);

-- Enable Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can insert their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can delete their own expenses" ON expenses;

-- Create RLS policies
-- Note: Using service role key with server-side filtering, so these are backup policies
CREATE POLICY "Users can view their own expenses"
  ON expenses
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own expenses"
  ON expenses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own expenses"
  ON expenses
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete their own expenses"
  ON expenses
  FOR DELETE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_expenses_updated_at ON expenses;
CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (for service role)
GRANT ALL ON expenses TO service_role;
GRANT ALL ON expenses TO anon;
GRANT ALL ON expenses TO authenticated;

-- Create users table
-- Stores user information synced with Clerk authentication
CREATE TABLE users (
  id TEXT PRIMARY KEY,                -- Clerk user ID (string format)
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create categories table
-- Master table for expense categories (9 fixed categories)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,          -- Category name in Japanese
  icon TEXT NOT NULL,                 -- Lucide icon name
  color TEXT NOT NULL,                -- Tailwind CSS color class
  display_order INTEGER NOT NULL,     -- Order for display
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the 9 fixed categories
INSERT INTO categories (name, icon, color, display_order) VALUES
  ('食費', 'utensils', 'bg-orange-500', 1),
  ('日用品', 'shopping-basket', 'bg-green-500', 2),
  ('交通費', 'train', 'bg-blue-500', 3),
  ('娯楽', 'gamepad-2', 'bg-purple-500', 4),
  ('衣服・美容', 'shirt', 'bg-pink-500', 5),
  ('医療・健康', 'heart-pulse', 'bg-red-500', 6),
  ('住居費', 'home', 'bg-yellow-500', 7),
  ('通信費', 'smartphone', 'bg-cyan-500', 8),
  ('その他', 'more-horizontal', 'bg-gray-500', 9);

-- Add category_id column to expenses table
ALTER TABLE expenses ADD COLUMN category_id UUID;

-- Create foreign key constraint from expenses to categories
ALTER TABLE expenses ADD CONSTRAINT fk_expenses_category
  FOREIGN KEY (category_id) REFERENCES categories(id);

-- Create foreign key constraint from expenses to users
ALTER TABLE expenses ADD CONSTRAINT fk_expenses_user
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Migrate existing category data (TEXT) to category_id (UUID)
-- This will map the old category names to the new category IDs
UPDATE expenses e
SET category_id = c.id
FROM categories c
WHERE e.category = c.name;

-- Drop the old category column (TEXT)
ALTER TABLE expenses DROP COLUMN category;

-- Make category_id NOT NULL after migration
ALTER TABLE expenses ALTER COLUMN category_id SET NOT NULL;

-- Create trigger to update updated_at on users table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on new tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policy for users: Users can only view and update their own record
CREATE POLICY users_select_own ON users
  FOR SELECT
  USING (auth.uid()::text = id);

CREATE POLICY users_update_own ON users
  FOR UPDATE
  USING (auth.uid()::text = id);

-- RLS Policy for categories: All authenticated users can read categories
CREATE POLICY categories_select_all ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Update indexes on expenses table
CREATE INDEX idx_expenses_category_id ON expenses(category_id);

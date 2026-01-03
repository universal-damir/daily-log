-- Supabase Schema for Daily Log App
-- Run this in the Supabase SQL Editor

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6b7280',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create entries table
CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  rating TEXT CHECK (rating IN ('good', 'average', 'bad')) NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, category_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_entries_user_id ON entries(user_id);
CREATE INDEX idx_entries_date ON entries(date);
CREATE INDEX idx_entries_category_id ON entries(category_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Users can view own categories"
  ON categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
  ON categories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
  ON categories FOR DELETE
  USING (auth.uid() = user_id);

-- Entries policies
CREATE POLICY "Users can view own entries"
  ON entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON entries FOR DELETE
  USING (auth.uid() = user_id);

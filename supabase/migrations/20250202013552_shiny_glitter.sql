/*
  # Initial Database Schema Setup

  1. Tables
    - `profiles`: User profiles with role-based access
    - `rss_feeds`: RSS feed sources for privacy news
    - `rss_entries`: RSS feed entries with full-text search

  2. Security
    - Enable RLS on all tables
    - Create policies for public/authenticated access
    - Set up service role access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create RSS feeds table
CREATE TABLE IF NOT EXISTS public.rss_feeds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  last_fetched timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create RSS entries table (without search vector initially)
CREATE TABLE IF NOT EXISTS public.rss_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id uuid REFERENCES public.rss_feeds(id) ON DELETE CASCADE,
  title text NOT NULL,
  link text NOT NULL,
  description text,
  author text,
  published_at timestamptz NOT NULL,
  guid text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add search vector column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rss_entries' 
    AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE public.rss_entries ADD COLUMN search_vector tsvector 
    GENERATED ALWAYS AS (
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
      setweight(to_tsvector('english', coalesce(author, '')), 'C')
    ) STORED;
  END IF;
END $$;

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS rss_entries_search_idx ON public.rss_entries USING gin(search_vector);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  -- Profiles policies
  DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  
  -- RSS feeds policies
  DROP POLICY IF EXISTS "Service role has full access to feeds" ON public.rss_feeds;
  DROP POLICY IF EXISTS "Public can read feeds" ON public.rss_feeds;
  DROP POLICY IF EXISTS "Admins can manage feeds" ON public.rss_feeds;
  
  -- RSS entries policies
  DROP POLICY IF EXISTS "Service role has full access to entries" ON public.rss_entries;
  DROP POLICY IF EXISTS "Public can read entries" ON public.rss_entries;
  DROP POLICY IF EXISTS "Admins can manage entries" ON public.rss_entries;
END $$;

-- Create new policies

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RSS feeds policies
CREATE POLICY "Service role has full access to feeds"
  ON public.rss_feeds
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read feeds"
  ON public.rss_feeds
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage feeds"
  ON public.rss_feeds
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- RSS entries policies
CREATE POLICY "Service role has full access to entries"
  ON public.rss_entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read entries"
  ON public.rss_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage entries"
  ON public.rss_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Insert initial RSS feeds
INSERT INTO public.rss_feeds (url, name, category)
VALUES 
  ('https://feeds.feedburner.com/TheHackersNews', 'The Hacker News', 'data_breaches'),
  ('https://www.bleepingcomputer.com/feed/', 'Bleeping Computer', 'data_breaches'),
  ('https://www.cisa.gov/cybersecurity-advisories/feed', 'CISA Advisories', 'investigations'),
  ('https://www.hipaajournal.com/feed/', 'HIPAA Journal', 'hipaa'),
  ('https://www.databreaches.net/feed/', 'DataBreaches.net', 'data_breaches'),
  ('https://www.privacyrights.org/rss.xml', 'Privacy Rights Clearinghouse', 'data_breaches'),
  ('https://www.iapp.org/feed/', 'IAPP', 'investigations')
ON CONFLICT (url) DO NOTHING;
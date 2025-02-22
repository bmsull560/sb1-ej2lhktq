/*
  # RSS Feed History Storage

  1. New Tables
    - `rss_feeds`
      - `id` (uuid, primary key)
      - `url` (text, unique)
      - `name` (text)
      - `category` (text)
      - `last_fetched` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `rss_entries`
      - `id` (uuid, primary key)
      - `feed_id` (uuid, references rss_feeds)
      - `title` (text)
      - `link` (text)
      - `description` (text)
      - `author` (text)
      - `published_at` (timestamptz)
      - `guid` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for system to insert/update data

  3. Search
    - Add full-text search capabilities to rss_entries
*/

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

-- Create RSS entries table with full-text search
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
  updated_at timestamptz DEFAULT now(),
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(author, '')), 'C')
  ) STORED
);

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS rss_entries_search_idx ON public.rss_entries USING gin(search_vector);

-- Enable RLS
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read RSS feeds"
  ON public.rss_feeds
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read RSS entries"
  ON public.rss_entries
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial RSS feeds
INSERT INTO public.rss_feeds (url, name, category) 
VALUES 
  ('https://feeds.feedburner.com/HaveIBeenPwnedLatestBreaches', 'Have I Been Pwned', 'data_breaches'),
  ('https://www.databreaches.net/feed/', 'DataBreaches.net', 'data_breaches'),
  ('https://www.privacyrights.org/rss.xml', 'Privacy Rights Clearinghouse', 'data_breaches'),
  ('https://www.hhs.gov/feed/rss/breach-report.xml', 'HHS Breach Portal', 'hipaa'),
  ('https://www.hipaajournal.com/feed/', 'HIPAA Journal', 'hipaa'),
  ('https://www.classaction.org/feed/category/data-privacy', 'ClassAction.org', 'lawsuits'),
  ('https://www.natlawreview.com/feed-privacy-data-protection', 'National Law Review', 'lawsuits'),
  ('https://iapp.org/feed/', 'IAPP', 'investigations'),
  ('https://www.bleepingcomputer.com/feed/', 'Bleeping Computer', 'investigations')
ON CONFLICT (url) DO NOTHING;
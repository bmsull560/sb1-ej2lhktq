/*
  # Create RSS Tables and Policies
  
  1. New Tables
    - rss_feeds
      - id (uuid, primary key)
      - url (text, unique)
      - name (text)
      - category (text)
      - last_fetched (timestamptz)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - rss_entries
      - id (uuid, primary key)
      - feed_id (uuid, foreign key)
      - title (text)
      - link (text)
      - description (text)
      - author (text)
      - published_at (timestamptz)
      - guid (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      - search_vector (tsvector)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for service role access
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
  -- Create a composite unique constraint for feed_id and guid
  UNIQUE(feed_id, guid),
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(author, '')), 'C')
  ) STORED
);

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS rss_entries_search_idx ON public.rss_entries USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_rss_feeds_url ON public.rss_feeds(url);

-- Enable RLS
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for rss_feeds
CREATE POLICY "Public can read feeds"
  ON public.rss_feeds
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role has full access to feeds"
  ON public.rss_feeds
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policies for rss_entries
CREATE POLICY "Public can read entries"
  ON public.rss_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role has full access to entries"
  ON public.rss_entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

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
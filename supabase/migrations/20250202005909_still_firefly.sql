/*
  # Add RSS Feed Policies

  1. Security Changes
    - Enable RLS on rss_feeds and rss_entries tables
    - Add policies for authenticated users to:
      - Read all RSS feeds and entries
      - Insert new RSS feeds and entries
      - Update RSS feeds and entries
      - Delete RSS feeds and entries (admin only)
    
  2. Changes
    - Add role-based access control
    - Add admin-specific policies
    - Add public read access
*/

-- Enable RLS on tables (if not already enabled)
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_entries ENABLE ROW LEVEL SECURITY;

-- Policies for rss_feeds

-- Allow public read access to feeds
CREATE POLICY "Allow public read access to feeds"
  ON public.rss_feeds
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert feeds
CREATE POLICY "Allow authenticated insert feeds"
  ON public.rss_feeds
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own feeds
CREATE POLICY "Allow authenticated update feeds"
  ON public.rss_feeds
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ));

-- Allow admin users to delete feeds
CREATE POLICY "Allow admin delete feeds"
  ON public.rss_feeds
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ));

-- Policies for rss_entries

-- Allow public read access to entries
CREATE POLICY "Allow public read access to entries"
  ON public.rss_entries
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert entries
CREATE POLICY "Allow authenticated insert entries"
  ON public.rss_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update entries
CREATE POLICY "Allow authenticated update entries"
  ON public.rss_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ));

-- Allow admin users to delete entries
CREATE POLICY "Allow admin delete entries"
  ON public.rss_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id 
    FROM public.profiles 
    WHERE role = 'admin'
  ));
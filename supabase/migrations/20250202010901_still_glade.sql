/*
  # Update RLS policies for RSS feeds and entries

  1. Changes
    - Add service role access for RSS operations
    - Maintain existing user policies
    - Add proper handling for service role token

  2. Security
    - Service role can perform all operations
    - Public users can only read
    - Authenticated users with admin role can manage feeds and entries
*/

-- Drop existing policies for rss_feeds
DROP POLICY IF EXISTS "Allow public read access to feeds" ON public.rss_feeds;
DROP POLICY IF EXISTS "Allow authenticated insert feeds" ON public.rss_feeds;
DROP POLICY IF EXISTS "Allow authenticated update feeds" ON public.rss_feeds;
DROP POLICY IF EXISTS "Allow admin delete feeds" ON public.rss_feeds;

-- Drop existing policies for rss_entries
DROP POLICY IF EXISTS "Allow public read access to entries" ON public.rss_entries;
DROP POLICY IF EXISTS "Allow authenticated insert entries" ON public.rss_entries;
DROP POLICY IF EXISTS "Allow authenticated update entries" ON public.rss_entries;
DROP POLICY IF EXISTS "Allow admin delete entries" ON public.rss_entries;

-- Create new policies for rss_feeds

-- Allow service role full access
CREATE POLICY "Service role has full access to feeds"
  ON public.rss_feeds
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public can read feeds"
  ON public.rss_feeds
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to manage feeds
CREATE POLICY "Admins can manage feeds"
  ON public.rss_feeds
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id 
      FROM public.profiles 
      WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id 
      FROM public.profiles 
      WHERE role = 'admin'
    )
  );

-- Create new policies for rss_entries

-- Allow service role full access
CREATE POLICY "Service role has full access to entries"
  ON public.rss_entries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Public can read entries"
  ON public.rss_entries
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to manage entries
CREATE POLICY "Admins can manage entries"
  ON public.rss_entries
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id 
      FROM public.profiles 
      WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id 
      FROM public.profiles 
      WHERE role = 'admin'
    )
  );
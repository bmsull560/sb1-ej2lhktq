/*
  # Clean up RSS tables and policies

  This migration safely removes RSS-related tables and their policies by:
  1. Checking for table existence before dropping policies
  2. Dropping indexes if they exist
  3. Dropping tables in the correct order (child tables first)
*/

-- Function to check if a table exists
CREATE OR REPLACE FUNCTION check_table_exists(tbl_name text) 
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = tbl_name
  );
END;
$$ LANGUAGE plpgsql;

-- Drop policies and tables only if they exist
DO $$ 
DECLARE
  table_exists boolean;
BEGIN
  -- Check rss_feeds table
  SELECT check_table_exists('rss_feeds') INTO table_exists;
  IF table_exists THEN
    -- Drop policies
    DROP POLICY IF EXISTS "Service role has full access to feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Public can read feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Admins can manage feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Allow public read access to feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Allow authenticated insert feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Allow authenticated update feeds" ON public.rss_feeds;
    DROP POLICY IF EXISTS "Allow admin delete feeds" ON public.rss_feeds;
    
    -- Drop URL index
    DROP INDEX IF EXISTS idx_rss_feeds_url;
  END IF;

  -- Check rss_entries table
  SELECT check_table_exists('rss_entries') INTO table_exists;
  IF table_exists THEN
    -- Drop policies
    DROP POLICY IF EXISTS "Service role has full access to entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Public can read entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Admins can manage entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Allow public read access to entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Allow authenticated insert entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Allow authenticated update entries" ON public.rss_entries;
    DROP POLICY IF EXISTS "Allow admin delete entries" ON public.rss_entries;

    -- Drop search index
    DROP INDEX IF EXISTS rss_entries_search_idx;
  END IF;

  -- Drop tables in correct order (entries first due to foreign key)
  DROP TABLE IF EXISTS public.rss_entries;
  DROP TABLE IF EXISTS public.rss_feeds;
END $$;

-- Clean up the helper function
DROP FUNCTION IF EXISTS check_table_exists;
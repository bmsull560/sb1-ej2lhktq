/*
  # Remove RSS functionality
  
  1. Changes
    - Drop RSS feeds and entries tables
    - Remove associated policies
*/

-- Drop tables if they exist
DROP TABLE IF EXISTS public.rss_entries CASCADE;
DROP TABLE IF EXISTS public.rss_feeds CASCADE;
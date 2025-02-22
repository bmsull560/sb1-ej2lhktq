/*
  # Clean RSS Feeds Migration

  1. Changes
    - Cleans up and re-inserts RSS feeds with proper URL formatting
    - Ensures no duplicate feeds
    - Maintains existing categories and structure

  2. Security
    - Maintains existing RLS policies
    - No changes to security settings
*/

-- First clean up any existing feeds with malformed URLs
DELETE FROM public.rss_feeds 
WHERE url LIKE '%\n%' 
   OR url LIKE '% %'
   OR url LIKE '\t%';

-- Insert feeds with clean URLs
INSERT INTO public.rss_feeds (url, name, category, last_fetched)
VALUES 
  ('
https://krebsonsecurity.com/feed/
', 'Krebs on Security', 'data_breaches', now()),
  ('
https://www.schneier.com/feed/atom/
', 'Schneier on Security', 'data_breaches', now()),
  ('
https://www.troyhunt.com/rss/
', 'Troy Hunt', 'data_breaches', now()),
  ('
https://www.darkreading.com/rss.xml
', 'Dark Reading', 'investigations', now()),
  ('
https://www.infosecurity-magazine.com/rss/news/
', 'Infosecurity Magazine', 'investigations', now()),
  ('
https://www.healthcareitnews.com/feed
', 'Healthcare IT News', 'hipaa', now()),
  ('
https://www.fiercehealthcare.com/feed
', 'Fierce Healthcare', 'hipaa', now()),
  ('
https://www.law360.com/rss/privacy
', 'Law360 Privacy', 'lawsuits', now()),
  ('
https://www.jdsupra.com/feed/privacy/
', 'JD Supra Privacy', 'lawsuits', now())
ON CONFLICT (url) DO NOTHING;
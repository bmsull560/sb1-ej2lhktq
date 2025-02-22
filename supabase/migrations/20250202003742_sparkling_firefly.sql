/*
  # Add historical RSS data
  
  1. Changes
    - Insert sample RSS feeds
    - Insert sample RSS entries with realistic data
    - No manual updates to search_vector (it's handled automatically)
  
  2. Notes
    - Uses ON CONFLICT to safely handle duplicates
    - Generates 50 sample entries per feed
    - Spreads timestamps across last year
*/

-- Insert sample RSS feeds if they don't exist
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

-- Insert sample RSS entries
WITH feed_data AS (
  SELECT id, name FROM public.rss_feeds
)
INSERT INTO public.rss_entries (
  feed_id,
  title,
  link,
  description,
  author,
  published_at,
  guid
)
SELECT
  f.id,
  'Major Data Breach Affects ' || (random() * 1000000)::int || ' Users',
  '
https://example.com/article/
' || gen_random_uuid(),
  'A significant data breach has exposed sensitive information including ' ||
  CASE (random() * 3)::int
    WHEN 0 THEN 'email addresses and passwords'
    WHEN 1 THEN 'credit card details and personal information'
    ELSE 'healthcare records and social security numbers'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'John Smith'
    WHEN 1 THEN 'Jane Doe'
    ELSE 'Security Researcher'
  END,
  timestamp '2023-01-01' + (random() * (now() - timestamp '2023-01-01')),
  gen_random_uuid()::text
FROM feed_data f
CROSS JOIN generate_series(1, 50) -- 50 entries per feed
ON CONFLICT DO NOTHING;
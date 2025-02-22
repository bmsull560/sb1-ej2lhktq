/*
  # Add RSS Feeds

  1. Changes
    - Insert initial RSS feeds for different categories
    - Each feed has a name, URL, and category

  2. Notes
    - Uses ON CONFLICT to avoid duplicate entries
    - Categories: data_breaches, hipaa, lawsuits, investigations
*/

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
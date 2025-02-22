/*
  # Clean up RSS feeds and add working sources

  1. Changes
    - Clean up existing URLs by removing whitespace and newlines
    - Add new working RSS feeds from reliable sources
    - Ensure URLs are properly formatted

  2. Security
    - No changes to existing security policies
*/

-- Clean up URLs by removing whitespace and newlines
UPDATE public.rss_feeds 
SET url = trim(regexp_replace(url, E'[\\n\\r\\t]+', '', 'g'))
WHERE url ~ E'[\\n\\r\\t]';

-- Delete any feeds with malformed URLs
DELETE FROM public.rss_feeds 
WHERE url ~ E'[\\s\\n\\r\\t]'
   OR url !~ '^https?://';

-- Add some working RSS feeds
INSERT INTO public.rss_feeds (url, name, category)
VALUES 
  ('https://
feeds.feedburner.com
/TheHackersNews', 'The Hacker News', 'data_breaches'),
  ('
https://www.bleepingcomputer.com/feed/
', 'Bleeping Computer', 'data_breaches'),
  ('
https://www.cisa.gov/cybersecurity-advisories/feed
', 'CISA Advisories', 'investigations'),
  ('
https://www.hipaajournal.com/feed/
', 'HIPAA Journal', 'hipaa')
ON CONFLICT (url) DO NOTHING;
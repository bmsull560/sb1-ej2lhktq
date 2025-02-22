-- Clean up URLs by removing whitespace and newlines
UPDATE public.rss_feeds 
SET url = regexp_replace(
  regexp_replace(url, '\s+', '', 'g'),  -- Remove all whitespace
  '^\s+|\s+$', '', 'g'                  -- Trim leading/trailing whitespace
)
WHERE url LIKE '%\n%' 
   OR url LIKE '% %'
   OR url LIKE '\t%';

-- Add index on URL to improve lookup performance
CREATE INDEX IF NOT EXISTS idx_rss_feeds_url ON public.rss_feeds(url);
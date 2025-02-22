import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { supabase } from '../lib/supabase';

// @ts-ignore
global.fetch = fetch;

const parser = new Parser({
  customFields: {
    item: [
      ['dc:creator', 'creator'],
      ['guid', 'guid'],
    ],
  },
});

async function fetchAndStoreFeed(feedUrl: string, feedId: string) {
  try {
    console.log(`Fetching feed: ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
    
    const entries = feed.items.map(item => ({
      feed_id: feedId,
      title: item.title || 'Untitled',
      link: item.link || '',
      description: item.contentSnippet || item.content || '',
      author: item.creator || item.author || '',
      published_at: item.pubDate ? new Date(item.pubDate) : new Date(),
      guid: item.guid || item.link || '',
    }));

    // Insert entries in batches of 100
    for (let i = 0; i < entries.length; i += 100) {
      const batch = entries.slice(i, i + 100);
      const { error } = await supabase
        .from('rss_entries')
        .upsert(batch, { 
          onConflict: 'feed_id,guid',
          ignoreDuplicates: true 
        });

      if (error) {
        console.error(`Error inserting batch for ${feedUrl}:`, error);
      }
    }

    // Update last_fetched timestamp
    await supabase
      .from('rss_feeds')
      .update({ last_fetched: new Date().toISOString() })
      .eq('id', feedId);

    console.log(`Successfully processed ${entries.length} entries from ${feedUrl}`);
  } catch (error) {
    console.error(`Failed to fetch feed ${feedUrl}:`, error);
  }
}

async function scrapeAllFeeds() {
  try {
    // Get all feeds from the database
    const { data: feeds, error } = await supabase
      .from('rss_feeds')
      .select('*');

    if (error) throw error;

    console.log(`Found ${feeds.length} feeds to process`);

    // Process feeds sequentially to avoid overwhelming the sources
    for (const feed of feeds) {
      await fetchAndStoreFeed(feed.url, feed.id);
      // Add a small delay between feeds
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('Historical feed scraping completed');
  } catch (error) {
    console.error('Failed to scrape feeds:', error);
    process.exit(1);
  }
}

// Run the scraper
scrapeAllFeeds().catch(console.error);
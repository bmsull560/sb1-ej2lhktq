import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the root .env file
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../');
config({ path: resolve(rootDir, '.env') });

// Set up Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔄 Initializing RSS scraper...');
console.log('URL:', supabaseUrl ? '✓ Found' : '✗ Missing');
console.log('Key:', supabaseKey ? '✓ Found' : '✗ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Configure RSS parser
const parser = new Parser({
  customFields: {
    item: [
      ['dc:creator', 'creator'],
      ['guid', 'guid'],
      ['content:encoded', 'content'],
      ['description', 'description']
    ],
  },
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; PrivacyGuardBot/1.0)',
    'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.8'
  },
  maxRedirects: 5
});

async function verifyDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('rss_feeds')
      .select('count');
    
    if (error) throw error;
    console.log('✓ Database connection verified');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function fetchAndStoreFeed(feedUrl, feedId) {
  console.log(`\n📥 Processing: ${feedUrl}`);
  
  try {
    const feed = await parser.parseURL(feedUrl);
    
    if (!feed.items?.length) {
      console.log('⚠️  No items found in feed');
      return { success: false, count: 0 };
    }

    console.log(`✓ Found ${feed.items.length} items`);
    
    const entries = feed.items.map(item => ({
      feed_id: feedId,
      title: item.title?.substring(0, 500) || 'Untitled',
      link: item.link?.substring(0, 1000) || '',
      description: (item.description || item.contentSnippet || item.content || '')?.substring(0, 5000),
      author: (item.creator || item.author || '')?.substring(0, 100),
      published_at: new Date(item.pubDate || item.isoDate || Date.now()).toISOString(),
      guid: `${feedId}:${item.guid || item.link || item.title || Date.now()}`.substring(0, 100)
    }));

    // Process in batches of 50
    const batchSize = 50;
    let successCount = 0;

    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      const { error } = await supabase
        .from('rss_entries')
        .upsert(batch, {
          onConflict: 'feed_id,guid'
        });

      if (error) {
        console.error(`❌ Batch error:`, error.message);
        continue;
      }

      successCount += batch.length;
      console.log(`✓ Processed ${successCount}/${entries.length} entries`);
    }

    // Update last_fetched timestamp
    await supabase
      .from('rss_feeds')
      .update({ last_fetched: new Date().toISOString() })
      .eq('id', feedId);

    return { success: true, count: successCount };
  } catch (error) {
    console.error(`❌ Feed error:`, error.message);
    return { success: false, count: 0 };
  }
}

async function scrapeAllFeeds() {
  console.log('\n🔄 Starting RSS feed scraper...');
  
  try {
    const isConnected = await verifyDatabaseConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Get initial count
    const { data: initialCount } = await supabase
      .from('rss_entries')
      .select('count');
    console.log(`📊 Initial entries: ${initialCount?.[0]?.count || 0}`);

    // Get all feeds
    const { data: feeds, error } = await supabase
      .from('rss_feeds')
      .select('*')
      .order('name');

    if (error) throw error;

    console.log(`📋 Found ${feeds.length} feeds to process\n`);

    let totalSuccess = 0;
    let totalProcessed = 0;

    for (const feed of feeds) {
      const result = await fetchAndStoreFeed(feed.url, feed.id);
      if (result.success) totalSuccess++;
      totalProcessed += result.count;
      
      // Add delay between feeds
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Get final count
    const { data: finalCount } = await supabase
      .from('rss_entries')
      .select('count');

    console.log('\n📊 Scraping Summary:');
    console.log(`✓ Successful feeds: ${totalSuccess}/${feeds.length}`);
    console.log(`📝 Total entries processed: ${totalProcessed}`);
    console.log(`📚 Total entries in database: ${finalCount?.[0]?.count || 0}`);

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the scraper
scrapeAllFeeds().catch(console.error);
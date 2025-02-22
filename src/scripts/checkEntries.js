import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../');
config({ path: resolve(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEntries() {
  console.log('Checking RSS entries in database...\n');

  try {
    // Get total count
    const { data: totalCount, error: countError } = await supabase
      .from('rss_entries')
      .select('count', { count: 'exact' });

    if (countError) throw countError;

    // Get entries grouped by feed
    const { data: feedStats, error: statsError } = await supabase
      .from('rss_entries')
      .select(`
        feed_id,
        rss_feeds (
          name,
          url
        )
      `);

    if (statsError) throw statsError;

    // Calculate stats
    const feedCounts = feedStats.reduce((acc, entry) => {
      const feedName = entry.rss_feeds.name;
      acc[feedName] = (acc[feedName] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Database Statistics:\n');
    console.log(`Total entries: ${totalCount[0].count}\n`);
    console.log('Entries by feed:');
    Object.entries(feedCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([name, count]) => {
        console.log(`${name}: ${count} entries`);
      });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkEntries().catch(console.error);
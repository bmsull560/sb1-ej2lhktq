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

async function checkFeeds() {
  console.log('Checking RSS feeds in database...\n');

  try {
    const { data: feeds, error } = await supabase
      .from('rss_feeds')
      .select('*')
      .order('name');

    if (error) throw error;

    console.log(`Found ${feeds.length} feeds:\n`);
    feeds.forEach(feed => {
      console.log(`Name: ${feed.name}`);
      console.log(`URL: ${feed.url}`);
      console.log(`Category: ${feed.category}`);
      console.log(`Last fetched: ${feed.last_fetched || 'Never'}`);
      console.log('---\n');
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkFeeds().catch(console.error);
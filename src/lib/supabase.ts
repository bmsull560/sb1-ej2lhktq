import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase credentials missing. Please click the "Connect to Supabase" button in the top right corner.'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    }
  }
);

// Verify connection
export const verifySupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('rss_feeds')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    return { ok: true, error: null };
  } catch (error) {
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to Supabase'
    };
  }
};
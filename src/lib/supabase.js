import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Verify Supabase connection
export const verifySupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('states')
      .select('count');
    
    if (error) {
      console.error('Database connection failed:', error);
      return { ok: false, error: error.message };
    }

    console.log('Database connection successful');
    return { ok: true, error: null };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to Supabase'
    };
  }
};
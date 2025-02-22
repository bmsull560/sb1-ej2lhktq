import { createClient } from '@supabase/supabase-js';
import type { State, PrivacyLaw, LawProvision } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getStates() {
  console.log('getStates: Fetching states from Supabase...');
  const { data, error } = await supabase
    .from('states')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('getStates: Error fetching states:', error);
    throw error;
  }
  console.log('getStates: Fetched states:', data);
  return data as State[];
}

export async function getStateName(stateCode: string) {
  console.log('getStateName: Fetching name for state code:', stateCode);
  const { data, error } = await supabase
    .from('states')
    .select('name')
    .eq('code', stateCode)
    .single();
    
  if (error) {
    console.error('getStateName: Error fetching state name:', error);
    throw error;
  }
  console.log('getStateName: Fetched state name:', data?.name);
  return data?.name;
}

export async function getStatePrivacyLaws(stateCode: string) {
  console.log('getStatePrivacyLaws: Fetching laws for state:', stateCode);
  const { data, error } = await supabase
    .from('privacy_laws')
    .select(`
      *,
      law_provisions (*)
    `)
    .eq('state_code', stateCode)
    .order('effective_date', { ascending: false });
    
  if (error) {
    console.error('getStatePrivacyLaws: Error fetching privacy laws:', error);
    throw error;
  }
  console.log('getStatePrivacyLaws: Fetched laws:', data);
  return data as (PrivacyLaw & { law_provisions: LawProvision[] })[];
}

// Verify Supabase connection
export async function verifySupabaseConnection() {
  console.log('verifySupabaseConnection: Testing connection...');
  try {
    const { data, error } = await supabase
      .from('states')
      .select('count');
    
    if (error) {
      console.error('verifySupabaseConnection: Connection failed:', error);
      return { ok: false, error: error.message };
    }

    console.log('verifySupabaseConnection: Connection successful');
    return { ok: true, error: null };
  } catch (error) {
    console.error('verifySupabaseConnection: Connection failed:', error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to Supabase'
    };
  }
}
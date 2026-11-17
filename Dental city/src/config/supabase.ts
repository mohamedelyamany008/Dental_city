import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_SUPABASE_URL = 'https://uwyyntbsvhqmrlthmgvn.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr';

let supabaseUrl = (process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
let supabaseKey = (process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY).trim();

// Ensure URL starts with a valid protocol to avoid TypeError in URL constructor
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.warn(`[Supabase Config] Malformed SUPABASE_URL "${supabaseUrl}". Falling back to default URL.`);
  supabaseUrl = DEFAULT_SUPABASE_URL;
}

if (!supabaseKey) {
  console.warn('[Supabase Config] Missing SUPABASE_KEY. Falling back to default key.');
  supabaseKey = DEFAULT_SUPABASE_KEY;
}

let client: SupabaseClient;
try {
  client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
} catch (err) {
  console.error('[CRITICAL] Error creating Supabase client, initializing safe fallback:', err);
  client = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export const supabase = client;

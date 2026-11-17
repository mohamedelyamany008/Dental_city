import { createClient, SupabaseClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Ensure global WebSocket is available for Node 20 and below (resolves Supabase Realtime crash)
if (typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = WebSocket;
}

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

const clientOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  // Explicitly supply WebSocket implementation to Realtime to prevent runtime crash on any Node version
  realtime: {
    transport: WebSocket as any
  }
};

let client: SupabaseClient;
try {
  client = createClient(supabaseUrl, supabaseKey, clientOptions);
} catch (err) {
  console.error('[CRITICAL] Error creating Supabase client, initializing safe fallback:', err);
  try {
    client = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY, clientOptions);
  } catch (fallbackErr) {
    console.error('[CRITICAL] Fallback Supabase client initialization also failed:', fallbackErr);
    // Return a safe dummy proxy to prevent container crash loop (CrashLoopBackOff)
    client = new Proxy({} as SupabaseClient, {
      get: (_target, prop) => {
        if (prop === 'from') {
          return () => ({
            select: () => Promise.resolve({ data: [], error: new Error('Supabase client offline') }),
            insert: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            update: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            delete: () => Promise.resolve({ data: null, error: new Error('Supabase client offline') }),
            order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) })
          });
        }
        return () => Promise.resolve({ data: null, error: new Error('Supabase client offline') });
      }
    });
  }
}

export const supabase = client;

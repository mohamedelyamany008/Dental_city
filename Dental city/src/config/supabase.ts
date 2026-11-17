import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://uwyyntbsvhqmrlthmgvn.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_MJntq3aqg2RNwM9cpqoeXQ_-oU2bIfr';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL or Key is missing from environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);


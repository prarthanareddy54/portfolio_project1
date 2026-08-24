import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  );
};

let supabaseClient = null;

if (isSupabaseConfigured()) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase Client initialized successfully.');
  } catch (error) {
    console.error('❌ Error initializing Supabase client:', error.message);
  }
} else {
  console.warn(
    '⚠️ Supabase credentials not set or using placeholder values in backend/.env. Running with graceful fallback mode.'
  );
}

export const supabase = supabaseClient;

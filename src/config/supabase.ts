import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Extra robust check to prevent "supabaseUrl is required" crash
const isConfigValid = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  typeof supabaseUrl === 'string' &&
  typeof supabaseAnonKey === 'string'

export const supabase = isConfigValid
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

if (!supabase) {
  // Silent in production, but keeps the app stable
  if (import.meta.env.DEV) {
    console.warn('Supabase credentials missing or invalid. Using local fallback.')
  }
}

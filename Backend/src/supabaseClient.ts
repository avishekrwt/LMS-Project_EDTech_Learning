import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''


if (!SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase ANON key in env.");
}
if (!SUPABASE_URL ) {
  throw new Error("Missing Supabase Url in env.");
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase Service Role Key in env.");
}

export const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export const supabaseService = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

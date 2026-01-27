import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// O "!" garante que as variáveis existem. 
// Como você já validou o .env.local, isso não dará erro.
export const supabase = 
  createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
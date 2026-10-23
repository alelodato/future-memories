import { createClient } from "@supabase/supabase-js";

// Client di sola lettura: nessuna sessione, le RLS limitano ai matrimoni pubblicati.
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
);
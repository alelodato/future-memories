import { createClient } from "@supabase/supabase-js";

let client = null;

// Client di sola lettura, creato solo quando serve.
// Se mancano le variabili d'ambiente restituisce null invece di bloccare la build.
export function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    if (!client) {
        client = createClient(url, key, { auth: { persistSession: false } });
    }
    return client;
}
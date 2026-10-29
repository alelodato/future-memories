import { getSupabase } from "@/lib/supabase";

export const TOKEN_PATTERN = /^[a-f0-9]{32}$/;

// Legge un solo preventivo dal suo codice, tramite la funzione sicura del database.
export async function getQuoteByToken(token) {
    const supabase = getSupabase();
    if (!supabase || !TOKEN_PATTERN.test(token || "")) return null;

    const { data, error } = await supabase.rpc("fm_get_quote", { p_token: token });
    if (error) {
        console.error("Lettura preventivo:", error.message);
        return null;
    }
    return data?.[0] || null;
}
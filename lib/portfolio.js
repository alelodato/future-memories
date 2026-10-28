import { cacheLife, cacheTag } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { PORTFOLIO_TAG } from "@/lib/portfolio-tag";

// "2026-06-14" → "Giugno 2026"
function formatMonthYear(date) {
    const label = new Date(`${date}T12:00:00`).toLocaleDateString("it-IT", {
        month: "long",
        year: "numeric",
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
}

// "https://vimeo.com/123456789" → "123456789"
function getVimeoId(url) {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
    return match ? match[1] : null;
}

// Stessi nomi di campo dei vecchi dati (couple, slug...) così i componenti esistenti continuano a funzionare.
function mapWedding(row) {
    return {
        slug: row.slug,
        couple: row.names,
        location: row.location,
        date: formatMonthYear(row.wedding_date),
        vimeoId: getVimeoId(row.vimeo_url),
        teaser: row.teaser_url,
        cover: row.cover_url,
        coverPosition: `${row.cover_position_x}% ${row.cover_position_y}%`,
        photos: [...(row.fm_wedding_photos || [])]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((photo) => ({ url: photo.url, width: photo.width, height: photo.height })),
    };
}

// Tutti i matrimoni pubblicati, dal più recente.
export async function getWeddings() {
    "use cache";
    cacheTag(PORTFOLIO_TAG);
    cacheLife("days");

    const supabase = getSupabase();
    if (!supabase) {
        console.warn("Portfolio: variabili Supabase mancanti, nessun matrimonio caricato.");
        return [];
    }

    const { data, error } = await supabase
        .from("fm_weddings")
        .select("*, fm_wedding_photos(url, width, height, sort_order)")
        .eq("published", true)
        .order("wedding_date", { ascending: false });

    if (error) {
        console.error("Errore nel caricamento del portfolio:", error.message);
        return [];
    }
    return data.map(mapWedding);
}

// Un matrimonio con il precedente e il successivo per la navigazione.
export async function getWedding(slug) {
    const weddings = await getWeddings();
    const index = weddings.findIndex((wedding) => wedding.slug === slug);
    if (index === -1) return null;

    const total = weddings.length;
    return {
        wedding: weddings[index],
        previous: total > 1 ? weddings[(index - 1 + total) % total] : null,
        next: total > 1 ? weddings[(index + 1) % total] : null,
    };
}
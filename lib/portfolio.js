import { cacheLife, cacheTag } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { PORTFOLIO_TAG } from "@/lib/portfolio-tag";

const FORMAT_LABELS = { trailer: "Wedding trailer", film: "Film completo" };
const CATEGORY_LABELS = { matrimonio: "Matrimonio", anniversario: "Anniversario" };

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
  const kind = row.kind === "foto" ? "foto" : "video";
  return {
    slug: row.slug,
    kind,
    format: kind === "video" ? row.video_format || "film" : null,
    category: kind === "foto" ? row.photo_category || "matrimonio" : null,
    typeLabel:
      kind === "foto"
        ? CATEGORY_LABELS[row.photo_category] || CATEGORY_LABELS.matrimonio
        : FORMAT_LABELS[row.video_format] || FORMAT_LABELS.film,
    couple: row.names,
    location: row.location,
    date: formatMonthYear(row.wedding_date),
    vimeoId: getVimeoId(row.vimeo_url),
    teaser: row.teaser_url,
    teaserLandscape: row.teaser_landscape_url,
    cover: row.cover_url,
    coverPosition: `${row.cover_position_x ?? 50}% ${row.cover_position_y ?? 50}%`,
    coverPositionDesktop: `${row.cover_position_x_desktop ?? 50}% ${row.cover_position_y_desktop ?? 50}%`,
    photos: [...(row.fm_wedding_photos || [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((photo) => ({ url: photo.url, width: photo.width, height: photo.height })),
  };
}

// Lettura in cache. In caso di errore lancia un'eccezione: così l'errore non viene memorizzato
// e la visita successiva riprova, invece di mostrare un portfolio vuoto per giorni.
async function fetchWeddings() {
  "use cache";
  cacheTag(PORTFOLIO_TAG);
  cacheLife("days");

  const supabase = getSupabase();
  if (!supabase) throw new Error("Variabili Supabase mancanti");

  const { data, error } = await supabase
    .from("fm_weddings")
    .select("*, fm_wedding_photos(url, width, height, sort_order)")
    .eq("published", true)
    .order("wedding_date", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapWedding);
}

// Tutti i lavori pubblicati, dal più recente. Non blocca mai la pagina.
export async function getWeddings() {
  try {
    return await fetchWeddings();
  } catch (error) {
    console.error("Errore nel caricamento del portfolio:", error.message);
    return [];
  }
}

export async function getVideoWorks() {
  return (await getWeddings()).filter((work) => work.kind === "video");
}

export async function getPhotoWorks() {
  return (await getWeddings()).filter((work) => work.kind === "foto");
}

// Un lavoro con il precedente e il successivo dello stesso tipo (video con video, foto con foto).
export async function getWedding(slug) {
  const weddings = await getWeddings();
  const wedding = weddings.find((item) => item.slug === slug);
  if (!wedding) return null;

  const siblings = weddings.filter((item) => item.kind === wedding.kind);
  const index = siblings.findIndex((item) => item.slug === slug);
  const total = siblings.length;

  return {
    wedding,
    previous: total > 1 ? siblings[(index - 1 + total) % total] : null,
    next: total > 1 ? siblings[(index + 1) % total] : null,
  };
}

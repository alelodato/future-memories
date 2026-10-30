import { cacheLife } from "next/cache";

// Preferisce le versioni ridimensionate di Behold: la grande per le schede del carosello.
function pickImage(post) {
  const sized = post.sizes?.large?.mediaUrl || post.sizes?.medium?.mediaUrl || post.sizes?.small?.mediaUrl;
  if (sized) return sized;
  return post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl;
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  });
}

// Like e commenti arrivano solo con una sorgente Behold avanzata: altrimenti null.
function toCount(value) {
  return typeof value === "number" && value >= 0 ? value : null;
}

// Lettura in cache. In caso di errore lancia un'eccezione, così l'errore non viene memorizzato.
async function fetchFeed(limit) {
  "use cache";
  cacheLife("hours");

  const url = process.env.BEHOLD_FEED_URL;
  if (!url) throw new Error("BEHOLD_FEED_URL mancante");

  const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();

  // Behold restituisce i post dentro "posts" (feed recenti) o direttamente come array (feed meno recenti).
  const rawPosts = Array.isArray(data) ? data : data.posts || [];
  const profile = Array.isArray(data)
    ? null
    : { username: data.username || null, picture: data.profilePictureUrl || null };

  const posts = rawPosts
    .map((post) => ({
      id: post.id,
      href: post.permalink,
      image: pickImage(post),
      isVideo: post.mediaType === "VIDEO",
      isCarousel: post.mediaType === "CAROUSEL_ALBUM",
      caption: (post.prunedCaption || post.caption || "").trim().slice(0, 300),
      date: formatDate(post.timestamp),
      likes: toCount(post.likeCount),
      comments: toCount(post.commentsCount),
    }))
    .filter((post) => post.image && post.href)
    .slice(0, limit);

  return { profile, posts };
}

// Profilo e ultimi post del feed Instagram. Non blocca mai la pagina.
export async function getInstagramFeed(limit = 12) {
  try {
    return await fetchFeed(limit);
  } catch (error) {
    console.error("Feed Instagram non disponibile:", error.message);
    return { profile: null, posts: [] };
  }
}

// Mantenuta per compatibilità con eventuali usi precedenti.
export async function getInstagramPosts(limit = 12) {
  const { posts } = await getInstagramFeed(limit);
  return posts;
}

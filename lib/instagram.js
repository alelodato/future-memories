import { cacheLife } from "next/cache";

// Preferisce le versioni ridimensionate di Behold: la grande per i post del carosello.
function pickImage(post) {
  const sized = post.sizes?.large?.mediaUrl || post.sizes?.medium?.mediaUrl || post.sizes?.small?.mediaUrl;
  if (sized) return sized;
  return post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl;
}

export async function getInstagramPosts(limit = 12) {
  "use cache";
  cacheLife("hours");

  const url = process.env.BEHOLD_FEED_URL;
  if (!url) return [];

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Behold restituisce i post dentro "posts" (feed recenti) o direttamente come array (feed meno recenti).
    const posts = Array.isArray(data) ? data : data.posts || [];

    return posts
      .map((post) => ({
        id: post.id,
        href: post.permalink,
        image: pickImage(post),
        isVideo: post.mediaType === "VIDEO",
        isCarousel: post.mediaType === "CAROUSEL_ALBUM",
        caption: (post.prunedCaption || post.caption || "").slice(0, 120),
      }))
      .filter((post) => post.image && post.href)
      .slice(0, limit);
  } catch (error) {
    console.error("Feed Instagram non disponibile:", error.message);
    return [];
  }
}

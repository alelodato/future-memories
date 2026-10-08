// Lavori del portfolio. L'ordine dell'array è l'ordine di visualizzazione
// e determina anche la navigazione precedente / successivo.
//
// Per ogni lavoro:
// - slug: indirizzo della scheda (/portfolio/<slug>)
// - couple, location, date: testi della card e della scheda
// - vimeoId: id numerico del video Vimeo (null = segnaposto)
// - cover: immagine di copertina in public/ (null = segnaposto)
// - gallery: 15-30 foto { src, alt, orientation: "landscape" | "portrait" }
//   con src in public/ (null = segnaposto)

function placeholderGallery(count) {
  return Array.from({ length: count }, (_, index) => ({
    src: null,
    alt: `Foto ${index + 1}`,
    orientation: index % 5 === 1 || index % 5 === 3 ? "portrait" : "landscape",
  }));
}

export const portfolio = [
  {
    slug: "matrimonio-1",
    couple: "[Nome] & [Nome]",
    location: "[LOCATION]",
    date: "[MESE ANNO]",
    vimeoId: null,
    cover: null,
    gallery: placeholderGallery(18),
  },
  {
    slug: "matrimonio-2",
    couple: "[Nome] & [Nome]",
    location: "[LOCATION]",
    date: "[MESE ANNO]",
    vimeoId: null,
    cover: null,
    gallery: placeholderGallery(18),
  },
  {
    slug: "matrimonio-3",
    couple: "[Nome] & [Nome]",
    location: "[LOCATION]",
    date: "[MESE ANNO]",
    vimeoId: null,
    cover: null,
    gallery: placeholderGallery(18),
  },
];

export function getWork(slug) {
  return portfolio.find((work) => work.slug === slug);
}

// Navigazione circolare: dal primo lavoro si torna all'ultimo e viceversa.
export function getAdjacentWorks(slug) {
  const index = portfolio.findIndex((work) => work.slug === slug);
  if (index === -1 || portfolio.length < 2) return { previous: null, next: null };
  const total = portfolio.length;
  return {
    previous: portfolio[(index - 1 + total) % total],
    next: portfolio[(index + 1) % total],
  };
}

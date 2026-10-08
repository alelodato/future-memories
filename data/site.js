// Dati di contatto e social, centralizzati: modificare solo qui.

const phone = "+39 393 1395785";
const phoneDigits = "393931395785";

export const site = {
  name: "Future Memories",
  tagline: "Photo & Video",
  description: "Fotografia e video di matrimonio. Wedding film & photography.",

  email: "futurememories.info@gmail.com",
  phone,
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: `https://wa.me/${phoneDigits}`,
  workArea: "Tutta Italia",
  responseTime: "[tempo]",
  vatNumber: "P.IVA [da compilare]",

  instagram: {
    handle: "@futurememories_photoevideo",
    href: "https://www.instagram.com/futurememories_photoevideo/",
  },
  instagramPersonal: {
    handle: "@gloriamargarino_",
    href: "https://www.instagram.com/gloriamargarino_/",
  },

  // File nella root di public/. Lasciare null finché il file non c'è:
  // al suo posto viene mostrato un riquadro segnaposto.
  media: {
    logo: null, // es. "/logo.svg"
    showreel: null, // es. "/showreel.mp4" (orizzontale, desktop)
    showreelVertical: null, // es. "/showreel-verticale.mp4" (9:16, mobile)
    showreelPoster: null, // es. "/showreel-poster.jpg"
    aboutPhoto: null, // es. "/chi-siamo.jpg"
  },
};

export const navLinks = [
  { label: "Homepage", href: "/" },
  { label: "Chi siamo", href: "/#chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contatti", href: "/contatti" },
];

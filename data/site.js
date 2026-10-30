// Dati di contatto e social, centralizzati: modificare solo qui.

const phone = "+39 393 1395785";
const phoneDigits = "393931395785";

export const site = {
  name: "Future Memories",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.futurememories.it",
  tagline: "Photo & Video",
  description: "Fotografia e video di matrimonio. Wedding film & photography.",

  email: "futurememories.info@gmail.com",
  phone,
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: `https://wa.me/${phoneDigits}`,
  workArea: "Tutta Italia",
  responseTime: "24 ore",
  vatNumber: "P.IVA 17267201006",

  instagram: {
    handle: "@futurememories_photoevideo",
    href: "https://www.instagram.com/futurememories_photoevideo/",
  },
  instagramPersonal: {
    handle: "@gloriamargarino_",
    href: "https://www.instagram.com/gloria.margarino_/",
  },

  // File nella root di public/. Lasciare null finché il file non c'è:
  // al suo posto viene mostrato un riquadro segnaposto.
  media: {
    logo: "/LogoNero.png",
    showreel: "/showreel-desktop.mp4", // es. "/showreel.mp4" (orizzontale, desktop)
    showreelVertical: "/showreel-mobile.mp4", // es. "/showreel-verticale.mp4" (9:16, mobile)
    showreelPoster: null, // es. "/showreel-poster.jpg"
    aboutPhoto: "/chi-siamo.jpg",
  },
};

export const navLinks = [
  { label: "Homepage", href: "/" },
  { label: "Chi siamo", href: "/#chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contatti", href: "/contatti" },
];

import { site } from "@/data/site";
import { getWeddings } from "@/lib/portfolio";

// Pagine pubbliche. Privacy e cookie policy restano fuori finché non arrivano i testi.
const PAGES = ["/", "/servizi", "/portfolio", "/contatti", "/preventivo"];

export default async function sitemap() {
  const weddings = await getWeddings();

  return [
    ...PAGES.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` })),
    ...weddings.map((wedding) => ({ url: `${site.url}/portfolio/${wedding.slug}` })),
  ];
}

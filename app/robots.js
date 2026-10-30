import { site } from "@/data/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/il-vostro-preventivo/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppFloating from "@/components/layout/WhatsAppFloating";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Wedding film & photography`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    images: [site.media.aboutPhoto],
  },
  twitter: { card: "summary_large_image" },
};

// Dati strutturati per i motori di ricerca: solo informazioni già presenti in data/site.js.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/LogoNero.png`,
  image: `${site.url}${site.media.aboutPhoto}`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  areaServed: "IT",
  sameAs: [site.instagram.href, site.instagramPersonal.href],
};

export const viewport = {
  themeColor: "#efe6da",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${montserrat.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-sabbia text-marrone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-marrone focus:px-4 focus:py-3 focus:text-crema"
        >
          Vai al contenuto
        </a>
        <Navbar />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}

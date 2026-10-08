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
  title: {
    default: `${site.name} · Wedding film & photography`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
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

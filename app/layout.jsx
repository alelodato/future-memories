import { Cormorant_Garamond, Montserrat } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}

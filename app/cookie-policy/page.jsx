import LegalPlaceholder from "@/components/layout/LegalPlaceholder";

// Fuori dall'indice finché non arriva il testo definitivo.
export const metadata = {
  title: "Cookie policy",
  description:
    "Cookie policy di Future Memories: informazioni sui cookie utilizzati dal sito futurememories.it e su come gestire le preferenze di navigazione.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false },
};

export default function CookiePolicyPage() {
  return <LegalPlaceholder title="Cookie policy" />;
}

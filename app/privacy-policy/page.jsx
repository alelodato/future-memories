import LegalPlaceholder from "@/components/layout/LegalPlaceholder";

// Fuori dall'indice finché non arriva il testo definitivo.
export const metadata = {
  title: "Privacy policy",
  description:
    "Informativa privacy di Future Memories: come vengono trattati i dati personali inviati tramite il sito, il modulo di contatto e la richiesta di preventivo.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return <LegalPlaceholder title="Privacy policy" />;
}

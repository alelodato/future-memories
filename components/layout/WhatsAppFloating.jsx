import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";

/** Pulsante WhatsApp sempre visibile su mobile (nascosto da lg in su). */
export default function WhatsAppFloating() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center bg-marrone text-crema shadow-lg transition-colors hover:bg-marrone-medio lg:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

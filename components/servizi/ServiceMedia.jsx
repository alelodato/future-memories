import Image from "next/image";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

/** Foto o video di un servizio, oppure il segnaposto se il file manca. */
export default function ServiceMedia({ service, tone = "dark", className = "", sizes = "100vw" }) {
  const { type, src, label } = service.media;

  if (!src) {
    return (
      <MediaPlaceholder
        play={type === "video"}
        label={label}
        tone={tone}
        className={className}
      />
    );
  }

  if (type === "video") {
    return (
      <div className={`relative overflow-hidden bg-beige-scuro ${className}`}>
        <video
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-label={service.title}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-beige-scuro ${className}`}>
      <Image src={src} alt={service.title} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/portfolio/Lightbox";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

/** Galleria della scheda: griglia a colonne, apertura a schermo intero. */
export default function Gallery({ photos, title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const close = useCallback(() => setOpenIndex(null), []);

  // Con Cache Components la pagina resta montata in background:
  // chiudere la galleria quando viene nascosta.
  useLayoutEffect(() => () => setOpenIndex(null), []);

  return (
    <>
      <ul className="columns-2 gap-2 lg:columns-3 lg:gap-5">
        {photos.map((photo, index) => {
          const ratio = photo.orientation === "portrait" ? "aspect-[2/3]" : "aspect-[3/2]";
          return (
            <li key={index} className="mb-2 break-inside-avoid lg:mb-5">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Apri a schermo intero: ${photo.alt}`}
                className="group block w-full cursor-zoom-in"
              >
                {photo.src ? (
                  <span className={`relative block overflow-hidden bg-beige-scuro ${ratio}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 64rem) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                ) : (
                  <MediaPlaceholder
                    tone={index % 2 === 0 ? "dark" : "light"}
                    className={`${ratio} transition-opacity group-hover:opacity-90`}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-marrone-medio">
        {title} · {photos.length} foto
      </p>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onClose={close} onChange={setOpenIndex} />
      )}
    </>
  );
}

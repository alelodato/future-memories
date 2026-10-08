"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/ui/Icons";

/** Visualizzazione a schermo intero della galleria, con tastiera e swipe. */
export default function Lightbox({ photos, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const photo = photos[index];
  const total = photos.length;

  const previous = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  useLayoutEffect(() => {
    document.documentElement.dataset.lightboxOpen = "true";
    closeRef.current?.focus();
    return () => {
      delete document.documentElement.dataset.lightboxOpen;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((index - 1 + total) % total);
      if (event.key === "ArrowRight") onChange((index + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onChange]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (delta > 50) previous();
    if (delta < -50) next();
    touchStart.current = null;
  };

  const isPortrait = photo.orientation === "portrait";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galleria fotografica, foto ${index + 1} di ${total}`}
      className="fixed inset-0 z-50 flex flex-col bg-marrone text-crema"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-8 lg:py-5">
        <p className="font-sans text-xs uppercase tracking-[0.2em]" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Chiudi la galleria"
          className="-mr-2 p-2 hover:text-beige-scuro"
        >
          <CloseIcon className="h-7 w-7" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 lg:px-24 lg:pb-10">
        {photo.src ? (
          <div className="relative h-full w-full">
            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
          </div>
        ) : (
          // Riquadro che si adatta allo spazio disponibile mantenendo le proporzioni
          <div className="flex h-full w-full items-center justify-center" style={{ containerType: "size" }}>
            <MediaPlaceholder
              label={photo.alt}
              style={{
                aspectRatio: isPortrait ? "2 / 3" : "3 / 2",
                width: isPortrait ? "min(100cqw, calc(100cqh * 2 / 3))" : "min(100cqw, 64rem, calc(100cqh * 3 / 2))",
              }}
            />
          </div>
        )}

        <button
          type="button"
          onClick={previous}
          aria-label="Foto precedente"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 p-3 hover:text-beige-scuro lg:block"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Foto successiva"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 p-3 hover:text-beige-scuro lg:block"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-between px-4 pb-6 lg:hidden">
        <button type="button" onClick={previous} aria-label="Foto precedente" className="p-3">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <button type="button" onClick={next} aria-label="Foto successiva" className="p-3">
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

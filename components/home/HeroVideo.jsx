"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Showreel in loop senza audio: versione orizzontale da lg in su,
 * verticale 9:16 su mobile. Scarica solo la versione adatta allo schermo.
 */
export default function HeroVideo({ src, verticalSrc, poster }) {
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(null);

  useLayoutEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const pick = () => setCurrent(query.matches ? src || verticalSrc : verticalSrc || src);
    pick();
    query.addEventListener("change", pick);

    const video = videoRef.current;
    video?.play().catch(() => {});

    return () => {
      query.removeEventListener("change", pick);
      // La pagina può restare montata in background: fermare il video.
      video?.pause();
    };
  }, [src, verticalSrc]);

  return (
    <video
      ref={videoRef}
      key={current}
      src={current || undefined}
      poster={poster || undefined}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}

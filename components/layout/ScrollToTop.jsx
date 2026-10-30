"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER = 600;

/**
 * Pulsante "torna su": compare dopo 600px di scroll.
 * Su mobile sta sopra il WhatsApp flottante (16px + 56px + 12px dal fondo), da lg in basso a destra.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = null;

    function update() {
      frame = null;
      setVisible(window.scrollY >= SHOW_AFTER);
    }

    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(update);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Torna all'inizio"
      aria-hidden={!visible}
      inert={!visible}
      data-scroll-top
      className={`fixed bottom-[calc(84px+env(safe-area-inset-bottom))] right-4 z-30 flex h-14 w-14 items-center justify-center bg-marrone text-crema shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-marrone-medio lg:bottom-[calc(1rem+env(safe-area-inset-bottom))] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}

"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Mostra gli elementi con data-reveal quando entrano nello schermo.
 * Usa un attributo (data-revealed) e non una classe, così React non lo
 * cancella quando aggiorna il className di un elemento.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("reveal-on");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    const observeAll = (scope) => {
      if (scope.matches?.(SELECTOR)) io.observe(scope);
      scope.querySelectorAll?.(SELECTOR).forEach((element) => io.observe(element));
    };

    observeAll(document.body);

    // Osserva anche i contenuti che arrivano dopo (navigazione, sezioni caricate in streaming).
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) observeAll(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

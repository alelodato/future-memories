"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const STORAGE_KEY = "fm-intro-vista";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Eseguito subito dopo il markup, prima che la pagina venga disegnata:
// nelle visite successive (o con movimento ridotto) l'intro non compare nemmeno per un istante.
const SKIP_SCRIPT = `try{if(sessionStorage.getItem("${STORAGE_KEY}")||matchMedia("${REDUCED_MOTION}").matches){document.getElementById("intro-logo").style.display="none"}}catch(e){}`;

function shouldSkip() {
  try {
    return Boolean(sessionStorage.getItem(STORAGE_KEY)) || window.matchMedia(REDUCED_MOTION).matches;
  } catch {
    return true;
  }
}

/**
 * Intro della homepage: il logo emerge da una maschera dal basso, poi lo strato
 * si dissolve e lascia la hero. Durata totale circa 1,8 secondi, solo alla prima
 * visita della sessione, saltata con prefers-reduced-motion.
 */
export default function IntroLogo() {
  const rootRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (shouldSkip()) {
        root.style.display = "none";
        return;
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}

      // Scroll bloccato solo durante l'intro, sempre ripristinato alla fine.
      const html = document.documentElement;
      const previousOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      const release = () => {
        html.style.overflow = previousOverflow;
      };

      gsap
        .timeline({
          onComplete: () => {
            root.style.display = "none";
            release();
          },
        })
        .fromTo(
          logoRef.current,
          { yPercent: 105, scale: 1.04 },
          { yPercent: 0, scale: 1, duration: 1, ease: "power3.out" }
        )
        .to(root, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.2");

      return release;
    },
    { scope: rootRef }
  );

  return (
    <>
      <div
        id="intro-logo"
        ref={rootRef}
        aria-hidden="true"
        suppressHydrationWarning
        className="fixed inset-0 z-50 flex items-center justify-center bg-sabbia"
      >
        <div className="overflow-hidden">
          <div ref={logoRef} className="will-change-transform">
            <Image
              src="/LogoNero.png"
              alt=""
              width={512}
              height={512}
              priority
              className="h-40 w-40 lg:h-56 lg:w-56"
            />
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <noscript>
        <style>{"#intro-logo{display:none}"}</style>
      </noscript>
    </>
  );
}

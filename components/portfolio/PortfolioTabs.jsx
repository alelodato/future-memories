"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";

const TABS = [
  { id: "video", label: "Video" },
  { id: "foto", label: "Foto" },
];

/**
 * Selettore Video · Foto del portfolio: mostra una sezione alla volta.
 * Intestazione della pagina (facoltativa), in tre parti:
 * - heroBackground: sfondo e decorazioni posizionati sulla hero (solo sotto lg)
 * - heroText: titolo e sottotitolo, con il selettore subito sotto
 * - heroPhotos: foto a destra del testo (da lg)
 * Sotto lg intestazione e selettore formano una schermata intera (alta come le storie video)
 * con il selettore in fondo, in versione chiara.
 */
export default function PortfolioTabs({ heroBackground, heroText, heroPhotos, video, foto }) {
  const [active, setActive] = useState("video");

  // Apre direttamente la scheda Foto se l'indirizzo termina con #foto (es. dal link "Tutti i lavori" di una galleria).
  useEffect(() => {
    if (window.location.hash === "#foto") setActive("foto");
  }, []);

  // Aggancio a schermate solo per i video su mobile (regola html[data-snap-stories] in globals.css).
  useEffect(() => {
    const root = document.documentElement;
    if (active === "video") root.dataset.snapStories = "true";
    else delete root.dataset.snapStories;
    return () => {
      delete root.dataset.snapStories;
    };
  }, [active]);

  function choose(id) {
    setActive(id);
    const url = id === "foto" ? `${window.location.pathname}#foto` : window.location.pathname;
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <>
      <div className="relative flex h-[calc(100svh-var(--navbar-height))] snap-start flex-col justify-end overflow-hidden pb-10 lg:block lg:h-auto lg:overflow-visible lg:pb-0">
        {heroBackground}
        <Container className="relative lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-x-20">
          <div>
            {heroText}
            <div role="tablist" aria-label="Tipo di lavori" data-reveal="fade" style={{ "--reveal-delay": "240ms" }} className="mt-8 inline-flex border border-crema lg:mt-10 lg:border-marrone">
              {TABS.map((tab) => {
                const selected = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`scheda-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`pannello-${tab.id}`}
                    onClick={() => choose(tab.id)}
                    className={`min-w-28 px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] transition-colors ${
                      selected ? "bg-crema text-marrone lg:bg-marrone lg:text-crema" : "text-crema hover:bg-crema/15 lg:text-marrone lg:hover:bg-beige"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          {heroPhotos}
        </Container>
      </div>

      <div id="pannello-video" role="tabpanel" aria-labelledby="scheda-video" hidden={active !== "video"}>
        {video}
      </div>
      <div id="pannello-foto" role="tabpanel" aria-labelledby="scheda-foto" hidden={active !== "foto"}>
        {foto}
      </div>
    </>
  );
}

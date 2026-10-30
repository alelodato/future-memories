"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";

const TABS = [
  { id: "video", label: "Video" },
  { id: "foto", label: "Foto" },
];

/** Selettore Video · Foto del portfolio: mostra una sezione alla volta. */
export default function PortfolioTabs({ video, foto }) {
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
      <Container>
        <div role="tablist" aria-label="Tipo di lavori" className="mt-8 inline-flex border border-marrone lg:mt-10">
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
                  selected ? "bg-marrone text-crema" : "text-marrone hover:bg-beige"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>

      <div id="pannello-video" role="tabpanel" aria-labelledby="scheda-video" hidden={active !== "video"}>
        {video}
      </div>
      <div id="pannello-foto" role="tabpanel" aria-labelledby="scheda-foto" hidden={active !== "foto"}>
        {foto}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyQuoteBar({ targetId }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let frame = null;

        function update() {
            frame = null;
            const target = document.getElementById(targetId);
            const pastTarget = target ? target.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
            const nearEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
            setVisible(pastTarget && !nearEnd);
        }

        function onScroll() {
            if (frame === null) frame = requestAnimationFrame(update);
        }

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [targetId]);

    // Segnala la barra visibile: in globals.css nasconde il WhatsApp flottante.
    useEffect(() => {
        const root = document.documentElement;
        if (visible) root.dataset.quoteBar = "visible";
        else delete root.dataset.quoteBar;
        return () => {
            delete root.dataset.quoteBar;
        };
    }, [visible]);

    return (
        <div
            aria-hidden={!visible}
            className={`fixed inset-x-0 bottom-0 z-40 border-t border-beige-scuro bg-crema/95 px-5 pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${visible ? "translate-y-0" : "translate-y-full"
                }`}
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
            <div className="flex items-center justify-between gap-4">
                <p className="font-serif text-lg leading-tight">
                    Volete un ricordo <em>così</em>?
                </p>
                <Link
                    href="/preventivo"
                    tabIndex={visible ? 0 : -1}
                    className="shrink-0 bg-marrone px-4 py-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-crema"
                >
                    Richiedi un preventivo
                </Link>
            </div>
        </div>
    );
}
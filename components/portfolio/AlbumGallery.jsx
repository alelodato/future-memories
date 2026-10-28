"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Lightbox({ photos, index, label, onClose, onChange }) {
    const touch = useRef(null);
    const [dragY, setDragY] = useState(0);
    const total = photos.length;
    const photo = photos[index];

    const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
    const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

    // Blocca lo scroll della pagina finché la galleria è aperta.
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    // Tastiera: frecce ed Esc.
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, prev, next]);

    // Precarica le foto vicine.
    useEffect(() => {
        [photos[(index + 1) % total], photos[(index - 1 + total) % total]].forEach((item) => {
            if (item) new Image().src = item.url;
        });
    }, [index, photos, total]);

    function onTouchStart(e) {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY, dx: 0, axis: null };
    }

    function onTouchMove(e) {
        const state = touch.current;
        if (!state) return;
        const t = e.touches[0];
        const dx = t.clientX - state.x;
        const dy = t.clientY - state.y;
        if (!state.axis && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
            state.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
        state.dx = dx;
        if (state.axis === "y") setDragY(Math.max(0, dy));
    }

    function onTouchEnd() {
        const state = touch.current;
        touch.current = null;
        if (state?.axis === "x" && Math.abs(state.dx) > 50) {
            if (state.dx < 0) next();
            else prev();
        }
        if (state?.axis === "y" && dragY > 120) onClose();
        setDragY(0);
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Galleria: ${label}`}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="absolute inset-0 bg-marrone"
                style={{ opacity: Math.max(0.3, 0.97 - dragY / 400) }}
                onClick={onClose}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                key={photo.url}
                src={photo.url}
                alt={`${label}, foto ${index + 1} di ${total}`}
                draggable={false}
                className="relative max-h-[85svh] max-w-[92vw] select-none lg:max-w-[80vw]"
                style={{
                    objectFit: "contain",
                    transform: `translateY(${dragY}px)`,
                    transition: dragY ? "none" : "transform 0.2s ease-out",
                }}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 lg:px-10 lg:py-6">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-crema">
                    {index + 1} / {total}
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Chiudi galleria"
                    className="flex h-10 w-10 items-center justify-center text-crema transition hover:opacity-70"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            </div>

            {total > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Foto precedente"
                        className="absolute left-4 hidden h-12 w-12 items-center justify-center text-crema transition hover:opacity-70 lg:flex"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                            <path d="M15 5l-7 7 7 7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Foto successiva"
                        className="absolute right-4 hidden h-12 w-12 items-center justify-center text-crema transition hover:opacity-70 lg:flex"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}
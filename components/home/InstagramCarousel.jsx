"use client";

import { useEffect, useRef, useState } from "react";

function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function CarouselIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="7" y="7" width="13" height="13" />
      <path d="M4 16V4h12" />
    </svg>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

const arrowClass =
  "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-marrone bg-crema text-marrone shadow-lg transition hover:bg-marrone hover:text-crema lg:flex";

/** Carosello orizzontale dei post Instagram: swipe su mobile, frecce da lg in su. */
export default function InstagramCarousel({ posts }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function update() {
      setCanPrev(track.scrollLeft > 8);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
    }

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scorre di un post alla volta, rispettando prefers-reduced-motion.
  function scrollByPost(direction) {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector("li");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = item ? item.offsetWidth + gap : track.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByPost(-1)}
        aria-label="Post precedenti"
        tabIndex={canPrev ? 0 : -1}
        className={`${arrowClass} left-0 -translate-x-1/2 ${canPrev ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowIcon direction="prev" />
      </button>

      <ul
        ref={trackRef}
        className="relative left-1/2 flex w-screen -translate-x-1/2 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:w-full lg:translate-x-0 lg:scroll-pl-0 lg:gap-6 lg:px-0"
      >
        {posts.map((post) => (
          <li key={post.id} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/3)]">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.caption ? `Apri su Instagram: ${post.caption}` : "Apri il post su Instagram"}
              className="group relative block aspect-[4/5] overflow-hidden bg-beige-scuro"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full transition duration-700 group-hover:scale-[1.03]"
                style={{ objectFit: "cover" }}
              />
              <span className="absolute inset-0 bg-marrone/0 transition-colors duration-300 group-hover:bg-marrone/15" />
              {(post.isVideo || post.isCarousel) && (
                <span className="absolute right-3 top-3 text-crema drop-shadow">
                  {post.isVideo ? <VideoIcon /> : <CarouselIcon />}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollByPost(1)}
        aria-label="Post successivi"
        tabIndex={canNext ? 0 : -1}
        className={`${arrowClass} right-0 translate-x-1/2 ${canNext ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowIcon direction="next" />
      </button>
    </div>
  );
}

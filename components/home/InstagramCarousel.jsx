"use client";

import { useEffect, useRef, useState } from "react";

const numberFormat = new Intl.NumberFormat("it-IT");

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

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
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

function PostCard({ post, profile }) {
  const username = profile?.username;
  const hasStats = post.likes !== null || post.comments !== null;

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption ? `Apri su Instagram: ${post.caption.slice(0, 100)}` : "Apri il post su Instagram"}
      className="group flex h-full w-full flex-col border border-beige-scuro bg-white/60 transition-colors hover:border-marrone-medio"
    >
      {username && (
        <div className="flex items-center gap-3 px-4 py-3">
          {profile.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.picture}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-9 w-9 shrink-0 rounded-full"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marrone font-serif text-crema">
              F
            </span>
          )}
          <span className="truncate font-sans text-sm font-semibold">{username}</span>
          <span className="ml-auto shrink-0 text-marrone-medio">
            <InstagramIcon />
          </span>
        </div>
      )}

      <div className="relative aspect-[4/5] overflow-hidden bg-beige-scuro">
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
        {(post.isVideo || post.isCarousel) && (
          <span className="absolute right-3 top-3 text-crema drop-shadow">
            {post.isVideo ? <VideoIcon /> : <CarouselIcon />}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {hasStats && (
          <div className="mb-2 flex items-center gap-4 font-sans text-sm font-semibold">
            {post.likes !== null && (
              <span className="inline-flex items-center gap-1.5">
                <HeartIcon />
                {numberFormat.format(post.likes)}
              </span>
            )}
            {post.comments !== null && (
              <span className="inline-flex items-center gap-1.5">
                <CommentIcon />
                {numberFormat.format(post.comments)}
              </span>
            )}
          </div>
        )}

        {post.caption && (
          <p className="line-clamp-3 text-sm leading-relaxed">
            {username && <span className="font-semibold">{username} </span>}
            {post.caption}
          </p>
        )}

        {post.date && (
          <p className="mt-auto pt-3 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-marrone-medio">
            {post.date}
          </p>
        )}
      </div>
    </a>
  );
}

const arrowClass =
  "flex h-12 w-12 items-center justify-center border border-marrone text-marrone transition hover:bg-marrone hover:text-crema disabled:pointer-events-none disabled:opacity-30";

/** Carosello orizzontale dei post Instagram: swipe su mobile, frecce da lg in su. */
export default function InstagramCarousel({ posts, profile }) {
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
    <div>
      <ul
        ref={trackRef}
        className="relative left-1/2 flex w-screen -translate-x-1/2 snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:w-full lg:translate-x-0 lg:scroll-pl-0 lg:gap-6 lg:px-0"
      >
        {posts.map((post) => (
          <li key={post.id} className="flex w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3rem)/3)]">
            <PostCard post={post} profile={profile} />
          </li>
        ))}
      </ul>

      <div className="mt-8 hidden justify-center gap-3 lg:flex">
        <button type="button" onClick={() => scrollByPost(-1)} disabled={!canPrev} aria-label="Post precedenti" className={arrowClass}>
          <ArrowIcon direction="prev" />
        </button>
        <button type="button" onClick={() => scrollByPost(1)} disabled={!canNext} aria-label="Post successivi" className={arrowClass}>
          <ArrowIcon direction="next" />
        </button>
      </div>
    </div>
  );
}

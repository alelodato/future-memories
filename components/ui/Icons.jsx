export function PlayIcon({ className = "h-16 w-16" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.2" />
      <path d="M26 21.5 44 32 26 42.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M15 8H2M7 3 2 8l5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 19.5 5.6 15.8A8 8 0 1 1 8.4 18.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.6c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3 0 .5-.4.7-.5.3-1.2.5-1.8.3-2.4-.7-4.3-2.6-5-5-.2-.6 0-1.3.3-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

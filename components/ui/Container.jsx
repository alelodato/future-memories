/** Contenitore con margini laterali coerenti in tutto il sito. */
export default function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 lg:px-12 ${className}`}>{children}</div>;
}

/** Small uppercase section label with a fine leading rule. */
export default function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
      {children}
    </p>
  );
}

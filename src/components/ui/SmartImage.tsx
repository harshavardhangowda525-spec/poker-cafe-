import { useState, type ReactNode } from 'react';

/**
 * Photo with a guaranteed fallback.
 * The fallback art is always rendered underneath; the photo fades in only after
 * it has actually loaded, so a slow or failed image never shows a broken icon.
 * Unsplash URLs get a responsive srcSet automatically.
 */
type Props = {
  src?: string;
  alt: string;
  fallback: ReactNode;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

const WIDTHS = [480, 800, 1200, 1800];

function srcSetFor(src: string) {
  if (!src.includes('images.unsplash.com')) return undefined;
  return WIDTHS.map(w => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ');
}

export default function SmartImage({ src, alt, fallback, sizes = '100vw', className = '', imgClassName = '', priority }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading');
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" aria-hidden="true">
        {fallback}
      </div>
      {src && state !== 'failed' && (
        <img
          src={src}
          srcSet={srcSetFor(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
      {(!src || state === 'failed') && <span className="sr-only">{alt}</span>}
    </div>
  );
}

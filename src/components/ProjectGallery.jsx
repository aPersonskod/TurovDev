import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PlaceholderGradient from './PlaceholderGradient';

/**
 * Hero gallery for a project:
 *  - big main image + thumbnail strip
 *  - click opens a full-screen, keyboard-navigable lightbox
 *  - graceful gradient placeholder if an image is missing or fails to load
 */
export default function ProjectGallery({ images = [], title = '' }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [failed, setFailed] = useState({});

  const hasImages = images.length > 0;

  const goPrev = useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length, hasImages]);

  const goNext = useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length, hasImages]);

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox, goPrev, goNext]);

  const currentSrc = hasImages ? images[index] : null;
  const showPlaceholder = !hasImages || failed[index];

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            if (hasImages && !failed[index]) setLightbox(true);
          }}
          aria-label={t('a11y.openImage')}
          className="group relative block w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <div className="relative aspect-video w-full">
            {showPlaceholder ? (
              <PlaceholderGradient label={title} />
            ) : (
              <img
                src={currentSrc}
                alt={`${title} — ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                onError={() => setFailed((f) => ({ ...f, [index]: true }))}
              />
            )}
          </div>
        </button>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => {
              const active = i === index;
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${title} — ${i + 1}`}
                  aria-current={active}
                  className={[
                    'relative aspect-video w-24 flex-shrink-0 overflow-hidden rounded-lg border transition',
                    active
                      ? 'border-indigo-500 ring-1 ring-indigo-500/40'
                      : 'border-slate-800 hover:border-slate-600',
                  ].join(' ')}
                >
                  {failed[i] ? (
                    <PlaceholderGradient label={title} />
                  ) : (
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {lightbox && !showPlaceholder && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label={t('a11y.closeImage')}
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-slate-700"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label={t('a11y.prevImage')}
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-slate-700 sm:left-6"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={t('a11y.nextImage')}
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 rounded-full bg-slate-800/80 p-2 text-white transition hover:bg-slate-700 sm:right-6"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}

          <img
            src={currentSrc}
            alt={`${title} — ${index + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
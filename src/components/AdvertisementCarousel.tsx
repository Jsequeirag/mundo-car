// src/components/AdvertisementCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  badge?: string; // ej: "-25%", "Nuevo", "Financiamiento"
};

interface AdvertisementCarouselProps {
  slides: Slide[];
  interval?: number; // ms (default 5000)
  heightClass?: string; // ej: "h-64 md:h-80 lg:h-[420px]"
  showIndicators?: boolean; // puntos de paginación
  showArrows?: boolean; // flechas
  showProgress?: boolean; // barra de tiempo por slide
  kenBurns?: boolean; // zoom/pan suave
  overlay?: boolean; // capa de gradient para legibilidad
  rounded?: string; // ej: "rounded-xl"
  onSlideChange?: (index: number) => void;
}

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({
  slides,
  interval = 5000,
  heightClass = "h-64 md:h-80 lg:h-[420px]",
  showIndicators = true,
  showArrows = true,
  showProgress = true,
  kenBurns = true,
  overlay = true,
  rounded = "rounded-2xl",
  onSlideChange,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Preload siguiente imagen para que el fade sea impecable
  useEffect(() => {
    const next = (index + 1) % slides.length;
    const img = new Image();
    img.src = slides[next]?.src ?? "";
  }, [index, slides]);

  // Autoplay con pausa por hover/visibility
  useEffect(() => {
    const tick = () => setIndex((i) => (i + 1) % slides.length);
    if (!paused && slides.length > 1) {
      timerRef.current = window.setTimeout(tick, interval) as unknown as number;
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, interval, slides.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    onSlideChange?.(index);
    // Reinicia la barra de progreso
    if (showProgress && progressRef.current) {
      progressRef.current.style.animation = "none";
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      progressRef.current.offsetHeight;
      progressRef.current.style.animation = `carouselProgress ${interval}ms linear forwards`;
    }
  }, [index, interval, onSlideChange, showProgress]);

  const go = (to: number) => {
    setIndex(((to % slides.length) + slides.length) % slides.length);
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Swipe móvil
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let delta = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      delta = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      delta = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (delta > 50) prev();
      else if (delta < -50) next();
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);

  const hasSlides = slides && slides.length > 0;
  const current = useMemo(() => slides[index], [slides, index]);

  if (!hasSlides) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${rounded} ${heightClass} group`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Promociones"
    >
      {/* Slides en stack, con crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.title ?? `Slide ${i + 1}`}
            className={`
              w-full h-full object-cover ${rounded}
              ${kenBurns ? "will-change-transform animate-kenburns" : ""}
            `}
            draggable={false}
          />

          {/* Overlay para legibilidad */}
          {overlay && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[#034651]/20 mix-blend-multiply" />
            </>
          )}
        </div>
      ))}

      {/* Contenido encima del slide activo */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="w-full p-4 sm:p-6 md:p-8">
          {/* Badge */}
          {current.badge && (
            <div className="pointer-events-auto inline-block bg-white text-[#034651] text-xs font-semibold px-3 py-1 rounded-full shadow-md mb-3">
              {current.badge}
            </div>
          )}

          {/* Título / subtítulo */}
          <div className="max-w-xl text-white drop-shadow-lg">
            {current.title && (
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {current.title}
              </h3>
            )}
            {current.subtitle && (
              <p className="mt-2 text-white/90 text-sm sm:text-base">
                {current.subtitle}
              </p>
            )}
          </div>

          {/* CTA */}
          {current.ctaText && current.ctaHref && (
            <div className="pointer-events-auto mt-4">
              <a
                href={current.ctaHref}
                target="_blank"
                className=" inline-flex items-center gap-2 bg-white text-[#034651] hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg transition"
              >
                {current.ctaText}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Barra de progreso (slide actual) */}
      {showProgress && slides.length > 1 && (
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
          <div ref={progressRef} className="h-full bg-white/80" aria-hidden />
        </div>
      )}

      {/* Flechas (aparecen al hover en desktop) */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            aria-label="Slide anterior"
            onClick={prev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 text-white shadow transition opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Siguiente slide"
            onClick={next}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 text-white shadow transition opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisementCarousel;

/* Agrega en tu CSS global (index.css / globals.css)

@keyframes kenburns {
  0%   { transform: scale(1.05) translate3d(0, 0, 0); }
  100% { transform: scale(1.12) translate3d(2%, -2%, 0); }
}
.animate-kenburns { animation: kenburns 10s ease-in-out infinite alternate; }

@keyframes carouselProgress {
  from { width: 0% }
  to   { width: 100% }
}
*/

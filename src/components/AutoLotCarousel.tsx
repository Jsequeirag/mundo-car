import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
type AutoLot = {
  id: string;
  name: string;
  image: string;
  subtitle?: string;
  ctaText?: string;
  link?: string;
  badge?: string;
};

interface AutoLotCarouselProps {
  autoLots: AutoLot[];
  interval?: number; // ms (default 5000)
  showIndicators?: boolean; // puntos de paginación
  showArrows?: boolean; // flechas
  showProgress?: boolean; // barra de tiempo por slide
  kenBurns?: boolean; // zoom/pan suave
  rounded?: string; // ej: "rounded-xl"
  onSlideChange?: (index: number) => void;
}

const AutoLotCarousel: React.FC<AutoLotCarouselProps> = ({
  autoLots,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  showProgress = true,
  kenBurns = true,
  rounded = "rounded-xl",
  onSlideChange,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode?: string }>();
  // Preload next image
  useEffect(() => {
    const next = (index + 1) % autoLots.length;
    const img = new Image();
    img.src = autoLots[next]?.image ?? "";
  }, [index, autoLots]);

  // Autoplay with pause on hover/visibility
  useEffect(() => {
    const tick = () => setIndex((i) => (i + 1) % autoLots.length);
    if (!paused && autoLots.length > 1) {
      timerRef.current = window.setTimeout(tick, interval) as unknown as number;
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, interval, autoLots.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    onSlideChange?.(index);
    if (showProgress && progressRef.current) {
      progressRef.current.style.animation = "none";
      progressRef.current.offsetHeight;
      progressRef.current.style.animation = `carouselProgress ${interval}ms linear forwards`;
    }
  }, [index, interval, onSlideChange, showProgress]);

  const go = (to: number) => {
    setIndex(((to % autoLots.length) + autoLots.length) % autoLots.length);
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Mobile swipe
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

  const hasLots = autoLots && autoLots.length > 0;
  const current = useMemo(() => autoLots[index], [autoLots, index]);

  if (!hasLots) return null;

  return (
    <Card className="bg-white border-none shadow-2xl rounded-xl overflow-hidden max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Autolotes
        </h2>
        <p className="text-sm md:text-base text-white/80 mt-1">
          Descubre los mejores vehículos usados
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className={`relative overflow-hidden ${rounded} w-full aspect-[3/2] group focus:outline-none`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Autolotes patrocinados"
        >
          {autoLots.map((lot, i) => (
            <div
              key={lot.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <div className="relative w-full h-400">
                <img
                  src={lot.image}
                  alt={lot.name}
                  className={`w-full h-full object-cover ${rounded} ${
                    kenBurns ? "will-change-transform animate-kenburns" : ""
                  }`}
                  loading={i === index ? "eager" : "lazy"}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                {lot.badge && (
                  <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {lot.badge}
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-end">
                <div className="w-full p-4 sm:p-6 md:p-8">
                  {lot.badge && (
                    <div className="pointer-events-auto inline-block bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md mb-3">
                      {lot.badge}
                    </div>
                  )}
                  <div className="max-w-xl text-white drop-shadow-lg">
                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                      {lot.name}
                    </h3>
                    {lot.subtitle && (
                      <p className="mt-2 text-white/90 text-sm sm:text-base">
                        {lot.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="pointer-events-auto mt-4 flex flex-col sm:flex-row gap-3">
                    {lot.ctaText && lot.link && (
                      <Button
                        onClick={() => window.open(lot.link, "_blank")}
                        className="inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        {lot.ctaText}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      onClick={() =>
                        navigate(`/${countryCode}/autolote/${lot.id}`)
                      }
                      className="inline-flex items-center gap-2 bg-white text-brand-primary hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                      aria-label={`Ir al detalle de ${lot.name}`}
                    >
                      Ver Autolote
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Progress bar */}
          {showProgress && autoLots.length > 1 && (
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
              <div
                ref={progressRef}
                className="h-full bg-white/80 transition-all duration-100"
                aria-hidden
              />
            </div>
          )}
          {/* Arrows */}
          {showArrows && autoLots.length > 1 && (
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
          {/* Indicators */}
          {showIndicators && autoLots.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {autoLots.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir al autolote ${i + 1}`}
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
      </CardContent>
    </Card>
  );
};

export default AutoLotCarousel;

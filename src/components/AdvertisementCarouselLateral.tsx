import React, { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

type SidebarAd = {
  src: string; // Image URL
  title?: string; // e.g., "Financing from 0% APR"
  ctaText?: string; // e.g., "View Offer"
  ctaHref?: string; // Link to promotion
};

interface AdvertisementCarouselProps {
  ads: SidebarAd[];
  interval?: number; // default 5000ms
  widthClass?: string; // default "w-72"
  heightClass?: string; // default "h-96"
  objectFit?: "cover" | "contain"; // default "cover"
  showIndicators?: boolean; // default true
  showProgress?: boolean; // default true
  overlay?: boolean; // default true
  kenBurns?: boolean; // default true
  roundedClass?: string; // default "rounded-2xl"
}

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({
  ads,
  interval = 5000,
  widthClass = "w-72",
  heightClass = "h-96",
  objectFit = "cover",
  showIndicators = true,
  showProgress = true,
  overlay = true,
  kenBurns = true,
  roundedClass = "rounded-2xl",
}) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Preload next image for smooth transitions
  useEffect(() => {
    const next = (current + 1) % ads.length;
    const img = new Image();
    img.src = ads[next]?.src ?? "";
  }, [current, ads]);

  // Autoplay
  useEffect(() => {
    if (!ads?.length || paused) return;
    const timer = setTimeout(
      () => setCurrent((i) => (i + 1) % ads.length),
      interval
    );
    return () => clearTimeout(timer);
  }, [current, paused, interval, ads]);

  // Progress bar animation
  useEffect(() => {
    if (!showProgress || !progressRef.current) return;
    const el = progressRef.current;
    el.style.animation = "none";
    // Force reflow
    el.offsetHeight;
    el.style.animation = `carouselProgress ${interval}ms linear forwards`;
  }, [current, interval, showProgress]);

  // Pause on tab visibility change
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mobile swipe support
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
  }, [current, ads?.length]);

  const next = () => setCurrent((i) => (i + 1) % ads.length);
  const prev = () => setCurrent((i) => (i - 1 + ads.length) % ads.length);

  if (!ads || ads.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${roundedClass} ${widthClass} ${heightClass} group w-full`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Sidebar Advertisements"
    >
      {/* Slides with crossfade */}
      {ads.map((ad, i) => (
        <div
          key={ad.src + i}
          className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === current ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden={i !== current}
        >
          <img
            src={ad.src}
            alt={ad.title ?? `Advertisement ${i + 1}`}
            className={`
              w-full h-full ${
                objectFit === "cover" ? "object-cover" : "object-contain"
              }
              ${roundedClass} ${
              kenBurns ? "will-change-transform animate-kenburns" : ""
            }
            `}
            draggable={false}
          />
          {overlay && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[#034651]/20 mix-blend-multiply" />
            </>
          )}
        </div>
      ))}

      {/* Content (title and CTA) */}
      {ads[current].title && (
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="w-full p-4">
            <h3 className="text-lg font-extrabold text-white drop-shadow-lg">
              {ads[current].title}
            </h3>
            {ads[current].ctaText && ads[current].ctaHref && (
              <a
                href={ads[current].ctaHref}
                target="_blank"
                className="pointer-events-auto mt-2 inline-flex items-center gap-2 bg-white text-[#034651] font-semibold px-3 py-1.5 rounded-lg shadow-lg transition hover:bg-gray-100 hover:scale-105"
              >
                {ads[current].ctaText}
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Indicators */}
      {showIndicators && ads.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {ads.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ad ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`
                h-2 rounded-full transition-all
                ${
                  i === current
                    ? "w-5 bg-white"
                    : "w-2 bg-white/60 hover:bg-white/80"
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && ads.length > 1 && (
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/20">
          <div ref={progressRef} className="h-full bg-white/90" aria-hidden />
        </div>
      )}
    </div>
  );
};

export default AdvertisementCarousel;

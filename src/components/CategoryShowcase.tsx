import React, { useEffect, useMemo, useRef, useState } from "react";
import { Car, MapPin, Package, PlusCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const autoLotes = [
  {
    id: "1",
    name: "AutoLote El Sol",
    image: "/assets/autolotes/autolote-premium.png",
  },
  {
    id: "2",
    name: "AutoLote La Estrella",
    image: "/assets/autolotes/autolote-laestrella.png",
  },
  {
    id: "3",
    name: "AutoLote Premium",
    image: "/assets/autolotes/autolote-premium.png",
  },
];

const CategoryShowcase: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };
  const categoryItems = [
    {
      label: "Autos Nuevos",
      icon: Car,
      href: `/${countryCode}/autos-nuevos`,
      image: "/assets/categories/newCars.jpg",
      description: "Explora los últimos modelos y estrenos del mercado.",
    },
    {
      label: "Autos Usados",
      icon: Car,
      href: `/${countryCode}/autos-usados`,
      image: "/assets/categories/usedCars.jpg",
      description: "Encuentra tu próximo vehículo de ocasión con confianza.",
    },
    {
      label: "Publicar Anuncio",
      icon: PlusCircle,
      href: `/${countryCode}/inicio`,
      image: "/assets/mundo/publishImage2.png",
      description: "Publica tu anuncio de forma rápida y sencilla.",
    },
    {
      label: "Renta de Autos",
      icon: MapPin,
      href: `/${countryCode}/renta`,
      image: "/assets/categories/rentCars.jpeg",
      description: "Servicios de alquiler flexibles para tus viajes.",
    },
    {
      label: "Autorepuestos",
      icon: Package,
      href: `/${countryCode}/repuestos`,
      image: "/assets/categories/parts.jpg",
      description: "Repuestos originales y de calidad para tu vehículo.",
    },
  ];
  // Componente interno para el carrusel reutilizable
  const CarouselComponent = ({
    dealers,
    title,
    subtitle,
  }: {
    dealers: { id: string; name: string; image: string }[];
    title: string;
    subtitle: string;
  }) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const interval = 5000;
    const showIndicators = true;
    const showArrows = true;
    const showProgress = true;
    const kenBurns = true;
    const rounded = "rounded-xl";

    useEffect(() => {
      const next = (index + 1) % dealers.length;
      const img = new Image();
      img.src = dealers[next]?.image ?? "";
    }, [index, dealers]);

    useEffect(() => {
      const tick = () => setIndex((i) => (i + 1) % dealers.length);
      if (!paused && dealers.length > 1) {
        timerRef.current = window.setTimeout(
          tick,
          interval
        ) as unknown as number;
      }
      return () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      };
    }, [index, paused, interval, dealers.length]);

    useEffect(() => {
      const onVisibility = () => setPaused(document.hidden);
      document.addEventListener("visibilitychange", onVisibility);
      return () =>
        document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
      if (showProgress && progressRef.current) {
        progressRef.current.style.animation = "none";
        progressRef.current.offsetHeight;
        progressRef.current.style.animation = `carouselProgress ${interval}ms linear forwards`;
      }
    }, [index, interval, showProgress]);

    const go = (to: number) => {
      setIndex(((to % dealers.length) + dealers.length) % dealers.length);
    };
    const prev = () => go(index - 1);
    const next = () => go(index + 1);

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

    const hasLots = dealers && dealers.length > 0;
    const current = useMemo(() => dealers[index], [dealers, index]);

    if (!hasLots) return null;

    return (
      <Card className="bg-gray-400/70 white border-none shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-white/80 mt-1">{subtitle}</p>
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
            aria-label={`${title} patrocinados`}
          >
            {dealers.map((lot, i) => (
              <div
                key={lot.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <div className="relative w-full h-full">
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
                        Ver {title}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {showProgress && dealers.length > 1 && (
              <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
                <div
                  ref={progressRef}
                  className="h-full bg-white/80 transition-all duration-100"
                  aria-hidden
                />
              </div>
            )}
            {showArrows && dealers.length > 1 && (
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
            {showIndicators && dealers.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {dealers.map((_, i) => (
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
  const navigate = useNavigate();
  return (
    <section
      className="py-12 md:py-16 bg-brand-primary"
      style={{
        backgroundImage: "url('/assets/mundo/howItWorks.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 text-shadow-md">
          Explora nuestras categorías
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Columna izquierda: Carrusel de AutoLotes (PC) */}
          <div className="lg:block lg:col-span-1"></div>

          {/* Columna central: Categorías */}
          <div className="lg:col-span-4">
            <div>
              <div className=" flex  flex-wrap justify-center items-center w-full">
                {categoryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      className="rounded-lg overflow-hidden shadow-lg
                               transform transition-transform duration-300 hover:scale-105 hover:shadow-xl w-[220px] h-[220px] mx-1 my-1 cursor-pointer"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => navigate(item.href)}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity flex flex-col justify-end p-4">
                        <div
                          className={`flex items-center text-white mb-2  ${
                            item.label === "Publicar Anuncio" &&
                            "bg-brand-primary rounded-full px-1 py-1"
                          }`}
                        >
                          <Icon className={`h-5 w-5 mr-2 `} />
                          <h3 className=" font-semibold truncate">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-white text-sm opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

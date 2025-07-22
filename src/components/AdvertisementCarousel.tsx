import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface AdvertisementCarouselProps {
  images: string[];
  interval?: number;
  className?: string; // Permitir clases CSS adicionales desde el componente padre
}

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({
  images,
  interval = 5000, // Por defecto 5 segundos para pruebas
  className, // Desestructurar la prop className
}) => {
  const autoplayOptions = {
    delay: interval,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay(autoplayOptions)]
  );

  // --- Código de depuración ---
  useEffect(() => {
    if (emblaApi) {
      console.log("Embla API está inicializado.");
      emblaApi.on("select", () => {
        console.log(
          "¡La diapositiva ha cambiado! Índice actual:",
          emblaApi.selectedScrollSnap()
        );
      });
      return () => {
        emblaApi.off("select");
      };
    } else {
      console.log("Embla API aún NO está inicializado.");
    }
  }, [emblaApi]);
  // --- FIN: Código de depuración ---

  // Funciones de scroll comentadas, no hay botones
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!images || images.length === 0) {
    console.warn("AdvertisementCarousel: No hay imágenes para mostrar.");
    return null;
  }

  return (
    // Se ajustan las clases de ancho para ser más consistentes y claras
    // Usamos 'w-full' por defecto y lo ajustamos en breakpoints más grandes
    // La prop 'className' permite que el padre defina anchos específicos si lo necesita
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl bg-white ${
        className || ""
      }`}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {images.map((src, index) => (
            <div key={index} className="flex-none min-w-0 w-full pl-4">
              <img
                src={src}
                alt={`Advertisement ${index + 1}`}
                // Mantener aspect-video para la proporción
                // Añadir clases para asegurar que la imagen cubra bien y se vea profesional
                className="w-full h-auto object-cover rounded-lg aspect-video"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación (COMENTADOS, como se pidió) */}
      {/*
      {emblaApi && (
        <>
          <Button
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
            onClick={scrollPrev}
            aria-label="Previous advertisement"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
            onClick={scrollNext}
            aria-label="Next advertisement"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </>
      )}
      */}
    </div>
  );
};

export default AdvertisementCarousel;

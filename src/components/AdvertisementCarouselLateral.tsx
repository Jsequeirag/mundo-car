// src/components/AdvertisementCarousel.tsx
import React, { useState, useEffect, useRef } from "react";

interface AdvertisementCarouselProps {
  images: string[];
  interval?: number; // Intervalo en ms para el autoplay (por defecto 5000ms = 5s)
  heightClass?: string; // Ejemplo: "h-32", "h-48", "h-64"
}

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({
  images,
  interval = 5000, // Valor por defecto a 5000ms (5 segundos)
  heightClass = "h-48 md:h-64 lg:h-80", // Altura por defecto
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Si no hay imágenes, no hacemos nada
    if (!images || images.length === 0) {
      return;
    }

    // Configura el intervalo para cambiar la imagen
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % images.length // Vuelve a 0 cuando llega al final
      );
    }, interval);

    // Limpia el temporizador cuando el componente se desmonte o el intervalo cambie
    return () => clearInterval(timer);
  }, [images, interval]); // Dependencias: Si las imágenes o el intervalo cambian, reinicia el temporizador

  // Si no hay imágenes, no renderizamos nada para evitar errores
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${heightClass}`}>
      {/* Muestra la imagen actual */}
      <img
        src={images[currentImageIndex]} // Usa el índice del estado para mostrar la imagen correcta
        alt={`Advertisement ${currentImageIndex + 1}`}
        className="w-full h-full  object-contain rounded-lg transition-opacity duration-700 ease-in-out"
        // Agregamos una transición para un efecto de "fade" suave al cambiar de imagen
      />

      {/* Indicadores de los puntos del carrusel (comentados) */}
      {/*
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-gray-400"
              } transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
      */}

      {/* Botones de navegación (anterior/siguiente) (comentados) */}
      {/*
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 text-gray-800 rounded-full p-2 hover:bg-white/80 transition-colors"
            aria-label="Previous slide"
          >
            &lt; // o una flecha de Lucide Icon
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 text-gray-800 rounded-full p-2 hover:bg-white/80 transition-colors"
            aria-label="Next slide"
          >
            &gt; // o una flecha de Lucide Icon
          </button>
        </>
      )}
      */}
    </div>
  );
};

export default AdvertisementCarousel;

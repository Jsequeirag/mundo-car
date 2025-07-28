// src/components/AdvertisementCarousel.tsx
import React, { useState, useEffect, useRef } from "react";
// Importa lo necesario para el carrusel, por ejemplo, de shadcn/ui si lo usas
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // Si usas Embla Carousel con autoplay

interface AdvertisementCarouselProps {
  images: string[];
  interval?: number; // Intervalo en ms para el autoplay
  // Nueva prop para controlar la altura
  heightClass?: string; // Ejemplo: "h-32", "h-48", "h-64"
}

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({
  images,
  interval = 5000,
  heightClass = "h-48 md:h-64 lg:h-80", // Altura por defecto: un poco más pequeña
}) => {
  const plugin = useRef(
    Autoplay({ delay: interval, stopOnInteraction: false })
  );
  // Suponiendo que estás usando Embla Carousel o algo similar con un hook useEmblaCarousel

  // Este es un esqueleto de cómo luciría con Embla Carousel / shadcn/ui.
  // Ajusta esto según tu implementación real del carrusel.
  // Si no usas shadcn/ui para el carrusel, solo modifica el div principal y la imagen.

  return (
    // Contenedor principal del carrusel
    <div className={`relative overflow-hidden rounded-lg ${heightClass} `}>
      {/* Si usas Embla/shadcn, descomenta esto y ajusta */}
      {/*
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex items-center justify-center h-full">
              <img
                src={image}
                alt={`Advertisement ${index + 1}`}
                className="w-full h-full object-cover rounded-lg" // object-cover para que la imagen cubra el espacio
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 text-brand-primary rounded-full p-2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 text-brand-primary rounded-full p-2" />
      </Carousel>
      */}

      {/* Si usas un carrusel simple de React (sin librerías complejas como Embla/Swiper): */}
      {/* Este es un ejemplo simplificado de cómo podrías rotar manualmente.
          Para un carrusel completo, necesitarías estado para el índice actual, etc. */}
      {images.length > 0 && (
        <img
          src={images[0]} // Muestra solo la primera imagen para este ejemplo simplificado
          alt="Advertisement"
          className="w-full h-full object-cover rounded-lg"
        />
      )}

      {/* PARA UN CARRUSEL FUNCIONAL (ASUMIENDO QUE YA LO TIENES IMPLEMENTADO): */}
      {/* La clave es que el contenedor del carrusel y las imágenes dentro tengan una altura controlada
          y que la imagen use `object-cover` para llenar el espacio sin deformarse. */}
      {/* Un carrusel real de 3 imágenes pequeñas rotando automáticamente. */}
      {/* Por favor, reemplaza el contenido de este div con tu implementación real del carrusel */}
      {/* Aquí un placeholder que asume un slider que ya tienes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Tu lógica de slider existente, asegúrate de que cada imagen se ajuste */}
        {images.map((imgSrc, index) => (
          <div
            key={index}
            // Agrega lógica para solo mostrar la imagen actual del slider
            // Por ejemplo: className={index === currentImageIndex ? 'block' : 'hidden'}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0" // Esto es solo un placeholder
            // Agrega una clase para la imagen activa, por ejemplo: 'opacity-100'
          >
            <img
              src={imgSrc}
              alt={`Anuncio ${index + 1}`}
              className="w-full h-full object-cover rounded-lg" // Ajusta esto
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementCarousel;

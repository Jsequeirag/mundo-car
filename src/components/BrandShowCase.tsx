// src/components/BrandShowcase.tsx
import React from "react";

const BrandShowcase: React.FC = () => {
  // Aquí puedes listar las rutas a los logos de tus marcas
  const brandLogos = [
    { name: "Toyota", src: "/assets/brands/toyota.png" }, // Asegúrate de tener estas imágenes
    { name: "Honda", src: "/assets/brands/honda.svg" },
    { name: "Ford", src: "/assets/brands/ford.png" },
    { name: "Nissan", src: "/assets/brands/nissan.png" },
    { name: "Hyundai", src: "/assets/brands/hyundai.gif" },
    { name: "Kia", src: "/assets/brands/kia.svg" },
    { name: "Chevrolet", src: "/assets/brands/chevrolet.png" },
    { name: "BMW", src: "/assets/brands/BMW.svg" },
    { name: "Mercedes-Benz", src: "/assets/brands/mercedes.png" },
    { name: "Audi", src: "/assets/brands/audi.png" },
    // Añade más marcas según necesites
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      {" "}
      {/* Fondo blanco o claro para contrastar con el Hero */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Explora por Marca
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-6 items-center justify-items-center">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
            >
              <img
                src={brand.src}
                alt={`${brand.name} Logo`}
                width={80} // Ancho por defecto
                height={40} // Alto por defecto
                className="w-16 h-auto sm:w-20 md:w-24 object-contain group-hover:scale-105 transition-transform duration-200" // Ajusta el tamaño aquí
              />
              {/* Puedes añadir el nombre de la marca si lo deseas, o dejar solo el logo */}
              {/* <span className="mt-2 text-xs sm:text-sm text-gray-600 font-medium group-hover:text-brand-primary">
                {brand.name}
              </span> */}
            </div>
          ))}
        </div>
        {/* Opcional: Un botón para ver todas las marcas */}
        <div className="mt-10">
          <button className="bg-brand-primary text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-brand-primary/90 transition-colors">
            Ver Todas las Marcas
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

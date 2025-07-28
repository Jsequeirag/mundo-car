// components/CategoryShowcase.tsx
import React from "react";
// import Link from "next/link"; // <-- ELIMINA ESTA LÍNEA
import { Car, MapPin, Package, Droplets } from "lucide-react"; // Importa solo los íconos necesarios
import { useParams, Outlet } from "react-router-dom";
// Define los ítems de las categorías con sus íconos, etiquetas, rutas e imágenes de ejemplo

interface CategoryShowcaseProps {
  currentCountryCode?: string; // NUEVA PROP: Para saber qué país está activo
}

const categoryItems = [
  {
    label: "Autos Nuevos",
    icon: Car,
    href: "/autos-nuevos",
    image: "/images/new-cars.jpg", // Asegúrate de tener estas imágenes
    description: "Explora los últimos modelos y estrenos del mercado.",
  },
  {
    label: "Autos Usados",
    icon: Car, // Podrías usar otro ícono para usados si tienes
    href: "/autos-usados",
    image: "/images/used-cars.jpg", // Asegúrate de tener estas imágenes
    description: "Encuentra tu próximo vehículo de ocasión con confianza.",
  },
  {
    label: "Renta de Autos",
    icon: MapPin,
    href: "/renta",
    image: "/images/car-rental.jpg", // Asegúrate de tener estas imágenes
    description: "Servicios de alquiler flexibles para tus viajes.",
  },
  {
    label: "Autorepuestos",
    icon: Package,
    href: "/repuestos",
    image: "/images/auto-parts.jpg", // Asegúrate de tener estas imágenes
    description: "Repuestos originales y de calidad para tu vehículo.",
  },
  {
    label: "Lubicentros",
    icon: Droplets,
    href: "/lubricentros",
    image: "/images/lubricants.jpg", // Asegúrate de tener estas imágenes
    description: "Mantenimiento y lubricación profesional para tu motor.",
  },
];

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  currentCountryCode,
}) => {
  const getCountryPath = (path: string) => {
    // Si no hay código de país (ej. en la página de selección de país),
    // o si el path ya es la raíz '/', simplemente devuelve el path tal cual
    if (!currentCountryCode || path === "/") {
      return path;
    }
    // Si el path es relativo y no empieza con '/', asume que es una sub-ruta del país
    // Esto es útil si tus rutas en App.tsx son como "autos-nuevos" dentro de /:countryCode
    if (path.startsWith("/")) {
      return `/${currentCountryCode}${path}`;
    }
    // Si el path es relativo sin barra inicial (menos común en hrefs, pero por si acaso)
    return `/${currentCountryCode}/${path}`;
  };

  return (
    <section className="py-12 md:py-16 bg-brand-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Explora nuestras categorías
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoryItems.map((item) => {
            const Icon = item.icon;
            return (
              // CAMBIO AQUÍ: Usar <a> en lugar de <Link>
              <a
                key={item.label}
                href={`${getCountryPath(item.href)}`}
                className="group block"
              >
                <div
                  className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg
                             transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay para hacer el texto legible */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex items-center text-white mb-2">
                      <Icon className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-semibold">{item.label}</h3>
                    </div>
                    <p className="text-white text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

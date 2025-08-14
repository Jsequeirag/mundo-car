import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters"; // Reutilizaremos
import LubricentrosGrid from "@/components/LubricentrosGrid"; // Nuevo componente
import Footer from "@/components/Footer";
import { mockLubricentros, Lubricentro } from "@/data/mockLubricentros"; // Importa los datos y la interfaz
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";

import MobileSidebar from "../components/MobileSidebar";
// Si estás usando Next.js 13+ App Router, esta será una "Client Component"
// ya que utiliza useState y useEffect.
// "use client";
import { useParams } from "react-router-dom";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
const LubricentrosPage: React.FC = () => {
  // Las imágenes de anuncios
  const adImagesTop = ["/assets/bridgestone.png"];

  const adImagesSide1 = [
    "/assets/toyota.png",
    "/assets/castrol-logo-png_seeklogo-307500.png",
    "/assets/sparco.png",
  ];

  const adImagesSide2 = [
    "/assets/momo.png",
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
    "/assets/gulf.png",
    "/assets/mascarello.png",
  ];

  const [lubricentros, setLubricentros] = useState<Lubricentro[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga inicial de todos los lubricentros
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      setLubricentros(mockLubricentros);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      let results = mockLubricentros;

      // Aplicar filtros de búsqueda de lubricentros
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        results = results.filter(
          (lub) =>
            lub.name.toLowerCase().includes(searchTermLower) ||
            lub.address.toLowerCase().includes(searchTermLower) ||
            lub.city.toLowerCase().includes(searchTermLower) ||
            lub.province.toLowerCase().includes(searchTermLower) ||
            lub.services.some((service) =>
              service.toLowerCase().includes(searchTermLower)
            )
        );
      }

      // Puedes añadir filtros específicos para lubricentros aquí,
      // dependiendo de cómo adaptes tu SearchFilters.tsx
      if (filters.serviceType) {
        // Ejemplo si tu filtro lo permite
        results = results.filter((lub) =>
          lub.services.includes(filters.serviceType)
        );
      }
      if (filters.city) {
        // Ejemplo si tu filtro lo permite
        results = results.filter(
          (lub) => lub.city.toLowerCase() === filters.city.toLowerCase()
        );
      }
      // ... otros filtros como horario, rating, etc.

      setLubricentros(results);
      setLoading(false);
    }, 1000);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { countryCode } = useParams<{ countryCode?: string }>();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        // Puedes pasar los navItems al MobileSidebar si no los define internamente
        // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
      />
      <div className="pt-[80px]">
        {" "}
        {/* Padding para compensar el header fijo */}
        {/* Hero Section para Lubricentros */}
        <Hero
          title="Lubricentros Cercanos"
          subtitle="Encuentra los mejores centros de lubricación para el mantenimiento de tu vehículo."
        />
        <main className=" mx-auto px-4 py-10">
          <div className="mb-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/bridgestone.png",
                  title: "Durabilidad y estilo en cada kilómetro.",
                  subtitle: "Rueda con confianza",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
                {
                  src: "/assets/texaco.png",
                  title: "Energía y servicio para tu camino.",
                  subtitle: "Llena tu tanque, sigue tu rumbo.",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              {/* Ajusta SearchFilters para lubricentros. */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="lubricenters" // Nuevo tipo de categoría para lubricentros
                // Puedes añadir otras props para que SearchFilters se adapte:
                // showVehicleType={false}
                // showCondition={false}
                // showPriceRange={false}
                // specificServiceTypes={['Cambio de aceite', 'Filtros', 'Engrase']} // Opciones de servicios
                // showLocationFilter={true} // Para filtrar por ciudad/provincia
              />
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",
                      title: "Innovación que impulsa el futuro.",
                      ctaText: "Ver más",
                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/meguiar.jpg",
                      title: "Potencia y elegancia en cada viaje",
                      ctaText: "Ver sitio",
                      ctaHref: "https://meguiarsdirect.com/",
                    },
                  ]}
                />{" "}
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/castrolOil.png",
                      title: "Innovación que impulsa el futuro.",
                      ctaText: "Ver más",
                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/castrol.png",
                      title: "Potencia y elegancia en cada viaje",
                      ctaText: "Ver sitio",
                      ctaHref: "https://www.toyota.com/",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Columna Central: Grid de Lubricentros */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Lubricentros Disponibles
                </h2>
                <p className="text-gray-600">
                  {lubricentros.length} lubricentros encontrados
                </p>
              </div>
              <LubricentrosGrid lubricentros={lubricentros} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",
                    title: "Innovación que impulsa el futuro.",
                    ctaText: "Ver más",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/castrol.png",
                    title: "Potencia y elegancia en cada viaje",
                    ctaText: "Ver más",
                    ctaHref: "https://www.toyota.com/",
                  },
                ]}
              />{" "}
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",
                    title: "Innovación que impulsa el futuro.",
                    ctaText: "Ver más",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/meguiar.jpg",
                    title: "Potencia y elegancia en cada viaje",
                    ctaText: "Ver más",
                    ctaHref: "https://meguiarsdirect.com/",
                  },
                ]}
              />{" "}
            </div>
          </div>{" "}
          <div className="mt-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/tesla.svg",
                  title: "Innovación que impulsa el futuro.",
                  subtitle: "Energía sin límites.",
                  ctaText: "Ir a sitio",
                  ctaHref: "https://www.bridgestone.co.cr/",
                  badge: "",
                },
                {
                  src: "/assets/toyotaxl.png",
                  title: "Potencia y elegancia en cada viaje",
                  subtitle: "Conduce tu destino.",
                  ctaText: "Ver sitio",
                  ctaHref: "https://www.toyota.com/",
                  badge: "",
                },
              ]}
            />
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default LubricentrosPage;

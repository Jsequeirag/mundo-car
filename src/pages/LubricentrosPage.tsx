// pages/LubricentrosPage.tsx
// O en Next.js App Router: app/lubicentros/page.tsx

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters"; // Reutilizaremos
import LubricentrosGrid from "@/components/LubricentrosGrid"; // Nuevo componente
import Footer from "@/components/Footer";
import { mockLubricentros, Lubricentro } from "@/data/mockLubricentros"; // Importa los datos y la interfaz
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA";

// Si estás usando Next.js 13+ App Router, esta será una "Client Component"
// ya que utiliza useState y useEffect.
// "use client";

const LubricentrosPage: React.FC = () => {
  // Las imágenes de anuncios
  const adImagesTop = [
    "/assets/thumb-bridgestone.png",
    "/assets/TEX_LandingPage-1.jpg",
  ];

  const adImagesSide1 = [
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
    "/assets/castrol-logo-png_seeklogo-307500.png",
  ];

  const adImagesSide2 = [
    "/assets/castrol-logo-png_seeklogo-307500.png",
    "/assets/meg-logo_506074c9-6b27-4912-b837-4d61fa365e7f.webp",
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

  // Necesitarás un MobileSidebar aquí también
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} />{" "}
      {/* Pasa la prop para el menú móvil */}
      {/* Importa y usa MobileSidebar si lo tienes */}
      {/* <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} /> */}
      <div className="pt-[80px]">
        {" "}
        {/* Padding para compensar el header fijo */}
        {/* Hero Section para Lubricentros */}
        <Hero
          title="Lubricentros Cercanos"
          subtitle="Encuentra los mejores centros de lubricación para el mantenimiento de tu vehículo."
          showSearch={false} // No mostramos la barra de búsqueda grande aquí
        />
        {/* Sección de CTA para registrar un negocio, adaptado */}
        <SecondaryCTA
          sectionTextColor="brand-primary"
          buttonBgColor="bg-brand-primary"
          sectionBgColor="bg-white"
          buttonTextColor="text-white"
          title="¿Tienes un lubricentro?"
          subtitle="Registra tu negocio y llega a nuevos clientes que buscan tus servicios."
          buttonText="Registrar Negocio"
          buttonLink="/registrar-negocio" // Cambia el enlace a tu página de registro de negocios
        />
        <main className=" mx-auto px-4 py-10">
          <div className="mb-8">
            <AdvertisementCarousel
              images={adImagesTop}
              interval={6000}
              heightClass="h-40 md:h-48 lg:h-56"
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
              <div className="hidden lg:block">
                <AdvertisementCarousel images={adImagesSide1} interval={7000} />
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
              <AdvertisementCarousel images={adImagesSide2} interval={8000} />
            </div>
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default LubricentrosPage;

// pages/AutoPartsPage.tsx
// O en Next.js App Router: app/repuestos/page.tsx

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters"; // Reutilizaremos este componente
import AutoPartsGrid from "@/components/AutoPartsGrid"; // Nuevo componente
import Footer from "@/components/Footer";
import { mockAutoParts, AutoPart } from "@/data/mockAutoParts"; // Importa los datos y la interfaz
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA"; // CTA para vender repuestos
import MobileSidebar from "../components/MobileSidebar";
// Si estás usando Next.js 13+ App Router, esta será una "Client Component"
// ya que utiliza useState y useEffect.
// Si no, ignora la línea de abajo.
// "use client";
import { useParams, Outlet } from "react-router-dom";
const AutoPartsPage: React.FC = () => {
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

  const [parts, setParts] = useState<AutoPart[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga inicial de todos los repuestos
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      setParts(mockAutoParts);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      let results = mockAutoParts;

      // Aplicar filtros de búsqueda de repuestos
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        results = results.filter(
          (part) =>
            part.name.toLowerCase().includes(searchTermLower) ||
            part.description.toLowerCase().includes(searchTermLower) ||
            part.category.toLowerCase().includes(searchTermLower) ||
            part.vehicleMake.some((make) =>
              make.toLowerCase().includes(searchTermLower)
            ) ||
            part.sellerInfo.location.toLowerCase().includes(searchTermLower)
        );
      }

      if (filters.category) {
        // Si SearchFilters ahora envía una categoría de repuesto
        results = results.filter((part) => part.category === filters.category);
      }

      if (filters.minPrice) {
        results = results.filter((part) => part.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        results = results.filter((part) => part.price <= filters.maxPrice);
      }
      // Podrías añadir filtros para vehicleMake, yearCompatibility, condition, etc.
      // Basado en cómo adaptes tu componente SearchFilters para repuestos.

      setParts(results);
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
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />{" "}
      {/* Pasa la prop para el menú móvil */}
      {/* Importa y usa MobileSidebar si lo tienes */}
      {/* <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} /> */}{" "}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        // Puedes pasar los navItems al MobileSidebar si no los define internamente
        // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
      />
      <div className="pt-[80px]">
        {" "}
        {/* Padding para compensar el header fijo */}
        {/* Hero Section para repuestos */}
        <Hero
          title="Repuestos para tu Vehículo"
          subtitle="Encuentra piezas nuevas, usadas y remanufacturadas para todas las marcas y modelos."
        />
        {/* Sección de CTA para vender un repuesto, adaptado */}
        <main className="mx-auto px-4 py-10">
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
              {/* Ajusta SearchFilters para repuestos. Podrías necesitar un prop 'type' */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="auto_parts" // Nuevo tipo de categoría para repuestos
                // Puedes añadir otras props para que SearchFilters se adapte
                // showVehicleType={false} // Oculta filtros de tipo de vehículo
                // showCondition={true} // Mostrar condición para repuestos (nuevo/usado/remanufacturado)
                // specificPartCategories={['Motor', 'Frenos', 'Suspensión']} // Opciones de categoría de repuestos
              />
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral
                  images={adImagesSide1}
                  interval={7000}
                />
              </div>
            </div>

            {/* Columna Central: Grid de Repuestos */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Repuestos Disponibles
                </h2>
                <p className="text-gray-600">
                  {parts.length} repuestos encontrados
                </p>
              </div>
              <AutoPartsGrid parts={parts} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                images={adImagesSide2}
                interval={8000}
              />
            </div>
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default AutoPartsPage;

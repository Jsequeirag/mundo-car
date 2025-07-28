import React, { useState } from "react";
import Header from "./Header";
import SearchFilters from "./SearchFilters";
import CarGrid from "./CarGrid";
import Footer from "./Footer";
import { mockCars } from "@/data/mockCars";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Shield, Users } from "lucide-react";
import AdvertisementCarousel from "./AdvertisementCarousel";
import AdvertisementCarouselLateral from "./AdvertisementCarouselLateral";
import BlogPreview from "./BlogPreview";
import Hero from "./Hero";
import CategoryShowcase from "./CategoryShowcase";
import MobileSidebar from "./MobileSidebar";
// IMPORTA LAS NUEVAS SECCIONES AQUÍ:
import HowItWorks from "./HowItWorks"; // O BenefitsSection

import SecondaryCTA from "./SecondaryCTA"; // O SellCarCTA
import { useParams, Outlet } from "react-router-dom";
const AppLayout: React.FC = () => {
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

  const adImagesBottom = ["/assets/texaco.png"];

  const [cars, setCars] = useState(mockCars);
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCars(mockCars);
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
      {/* ESTE ES EL DIV QUE VA A EMPUJAR TODO EL CONTENIDO HACIA ABAJO */}
      {/* El padding-top debe ser igual a la altura máxima del Header */}
      <div className="pt-[80px]">
        {/* Hero Section - QUITAMOS el padding-top de aquí */}
        <Hero />
        <CategoryShowcase currentCountryCode={countryCode} />
        {/* Altura máxima del Header es 80px (h-20) */}
        {/* NUEVA SECCIÓN: CATEGORY SHOWCASE */}
        <HowItWorks />
        <SecondaryCTA />
        {/* 6. "HOW IT WORKS" / BENEFICIOS (NUEVA SECCIÓN) */}
        {/* Main Content */}
        <main className=" mx-auto px-6 py-10">
          <div className="mb-8">
            <AdvertisementCarousel images={adImagesTop} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters onSearch={handleSearch} />
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral
                  images={adImagesSide1}
                  interval={7000}
                />
              </div>
            </div>

            {/* Columna Central: Grid de Carros (ocupa más espacio) */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Featured Vehicles
                </h2>
                <p className="text-gray-600">{cars.length} cars available</p>
              </div>
              <CarGrid cars={cars} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                images={adImagesSide2}
                interval={8000}
              />
            </div>
          </div>
          {/* Anuncio Banner Inferior */}
          {
            <div className="mt-8">
              <AdvertisementCarousel images={adImagesBottom} />
            </div>
          }
        </main>
      </div>
      {/*<BlogPreview />*/}
      {/* CIERRE DEL DIV CON EL PADDING-TOP */}{" "}
      {/* Aquí es donde renderizarías el menú lateral para móvil */}
      <Footer />
    </div>
  );
};

export default AppLayout;

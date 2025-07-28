// pages/UsedCarsPage.tsx (o app/autos-usados/page.tsx)
import React, { useState, useEffect } from "react";
import Header from "@/components/Header"; // Asegúrate de que las rutas de importación sean correctas
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockCars } from "@/data/mockCars";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero"; // Reutilizaremos el Hero, pasándole diferentes props
import BrandShowcase from "@/components/BrandShowCase"; // Si quieres mostrar las marcas también en esta página
// IMPORTA LAS SECCIONES ADICIONALES SI LAS USARÁS AQUÍ
import HowItWorks from "@/components/HowItWorks"; // Sección de beneficios
import SecondaryCTA from "@/components/SecondaryCTA"; // CTA para vender coche
import MobileSidebar from "../components/MobileSidebar";
import { useParams, Outlet } from "react-router-dom";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
const UsedCarsPage: React.FC = () => {
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

  const [usedCars, setUsedCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtra los autos usados cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      const filteredCars = mockCars.filter((car) => car.condition === "used");
      setUsedCars(filteredCars);
      setLoading(false);
    }, 500); // Retraso para simular carga
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      // Filtra primero por condición "used" y luego aplica otros filtros
      const filteredByCondition = mockCars.filter(
        (car) => car.condition === "used"
      );
      let results = filteredByCondition;

      // Ejemplo de aplicación de filtros adicionales (puedes expandirlo)
      if (filters.searchTerm) {
        results = results.filter(
          (car) =>
            car.make.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            car.model
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase()) ||
            car.description
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase())
        );
      }
      if (filters.priceRange) {
        results = results.filter(
          (car) =>
            car.price >= filters.priceRange[0] &&
            car.price <= filters.priceRange[1]
        );
      }
      if (filters.yearRange) {
        // Asegúrate de aplicar el filtro de año también
        results = results.filter(
          (car) =>
            car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1]
        );
      }
      // ... otros filtros

      setUsedCars(results);
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
      <div className="pt-[80px]">
        {/* Hero específico para autos usados */}
        <Hero
          title="Autos Usados de Calidad"
          subtitle="Encuentra vehículos confiables con las mejores ofertas y verificación garantizada."
        />{" "}
        <MobileSidebar
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          // Puedes pasar los navItems al MobileSidebar si no los define internamente
          // navItems={/* el mismo array navItems que tienes en Header, o adaptado */}
        />
        {/* Puedes añadir el BrandShowcase aquí también si es relevante para autos usados */}
        {/* <BrandShowcase /> */}
        {/* Aquí podrías poner el HowItWorks o SecondaryCTA si aplican también a esta página */}
        {/* <HowItWorks />*/}
        <SecondaryCTA
          sectionTextColor="brand-primary"
          buttonBgColor="bg-brand-primary"
          sectionBgColor="bg-white"
          buttonTextColor="bg-brand-primary"
        />
        <main className="mx-auto px-6 py-10">
          <div className="mb-8">
            <AdvertisementCarousel images={adImagesTop} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              {/* Pasa la categoría "used_cars" por defecto al SearchFilters */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="used_cars" // <-- Cambiado a "used_cars"
              />
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral images={adImagesSide1} />
              </div>
            </div>

            {/* Columna Central: Grid de Carros (ocupa más espacio) */}
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Vehículos Usados Destacados
                </h2>
                <p className="text-gray-600">
                  {usedCars.length} autos usados disponibles
                </p>
              </div>
              <CarGrid cars={usedCars} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral images={adImagesSide2} />
            </div>
          </div>
        </main>
      </div>
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default UsedCarsPage;

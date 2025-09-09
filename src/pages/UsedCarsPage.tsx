// pages/UsedCarsPage.tsx (o app/autos-usados/page.tsx)
import React, { useState, useEffect } from "react";
import Header from "@/components/Header"; // Asegúrate de que las rutas de importación sean correctas
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockUsedCars } from "@/data/mockUsedCars";
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
import AutoLotCarousel from "@/components/AutoLotCarousel";
import BrandShowCase from "@/components/BrandShowCase";
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
  const autoLots = [
    {
      id: "1",
      name: "AutoLote El Sol",
      image: "/assets/autolotes/autolote-premium.png",
    },
    {
      id: "2",
      name: "AutoLote La Estrella",
      image: "/assets/autolotes/autolote-laestrella.png",
    },
    {
      id: "3",
      name: "AutoLote Premium",
      image: "/assets/autolotes/autolote-premium.png",
    },
    // Agrega más autolotes
  ];
  const [usedCars, setUsedCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const brandLogos = [
    {
      id: "1",
      name: "AutoLote El Sol",
      src: "/assets/autolotes/logo-elsol.png",
      type: "autolotes",
    },
    {
      id: "2",
      name: "AutoLote La Estrella",
      src: "/assets/autolotes/logo-laestrella.png",
      type: "autolotes",
    },
    {
      id: "3",
      name: "AutoLote Premium",
      src: "/assets/autolotes/logo-premium.png",
      type: "autolotes",
    },
    // Añade más marcas según necesites
  ];
  // Filtra los autos usados cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      const filteredCars = mockUsedCars.filter(
        (car) => car.condition === "usado"
      );
      setUsedCars(filteredCars);
      setLoading(false);
    }, 500); // Retraso para simular carga
  }, []);

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      // Filtra primero por condición "used" y luego aplica otros filtros
      const filteredByCondition = mockUsedCars.filter(
        (car) => car.condition === "usado"
      );
      let results = filteredByCondition;

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
        <BrandShowCase brandLogos={brandLogos} />
        <main className="mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              {/* Pasa la categoría "used_cars" por defecto al SearchFilters */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="used_cars" // <-- Cambiado a "used_cars"
                lockCategory={true}
              />
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",

                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/meguiar.jpg",

                      ctaHref: "https://meguiarsdirect.com/",
                    },
                  ]}
                />{" "}
              </div>
            </div>

            {/* Columna Central: Grid de Carros (ocupa más espacio) */}
            <div className="lg:col-span-3 xl:col-span-4">
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
            {/*   <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/castrol.png",
                    ctaHref: "https://www.toyota.com/",
                  },
                ]}
              />{" "}
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/meguiar.jpg",
                    ctaHref: "https://meguiarsdirect.com/",
                  },
                ]}
              />{" "}
            </div>*/}
          </div>{" "}
          {
            <div className="mt-8">
              <AdvertisementCarousel
                slides={[
                  {
                    src: "/assets/tesla.svg",
                    ctaHref: "https://www.bridgestone.co.cr/",
                    badge: "",
                  },
                  {
                    src: "/assets/toyotaxl.png",
                    ctaHref: "https://www.toyota.com/",
                    badge: "",
                  },
                ]}
              />
            </div>
          }
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UsedCarsPage;

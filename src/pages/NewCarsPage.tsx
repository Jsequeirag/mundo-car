// pages/NewCarsPage.tsx (o app/autos-nuevos/page.tsx)
import React, { useState, useEffect } from "react";
import Header from "@/components/Header"; // Asegúrate de que las rutas de importación sean correctas
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import { mockNewCars } from "@/data/mockNewCars";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero"; // Puedes decidir si quieres un Hero específico o no
import BrandShowCase from "@/components/BrandShowCase"; // Puedes decidir si quieres un Hero específico o no
// IMPORTA LAS SECCIONES ADICIONALES SI LAS USARÁS AQUÍ
import HowItWorks from "@/components/HowItWorks"; // Sección de beneficios
import SecondaryCTA from "@/components/SecondaryCTA"; // CTA para vender coche
import MobileSidebar from "../components/MobileSidebar"; // Asegúrate de que la ruta sea correcta
import { useParams, Outlet } from "react-router-dom";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
const NewCarsPage: React.FC = () => {
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

  const [newCars, setNewCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const brandLogos = [
    {
      id: 1,
      name: "HONDA",
      src: "/assets/brands/honda.svg",
      type: "concesionario",
    },
    {
      id: 2,
      name: "GRUPO FLORES",
      src: "/assets/concesionarios/flores.png",
      type: "concesionario",
    }, // Asegúrate de tener estas imágenes
    {
      id: 3,
      name: "DIMASA",
      src: "/assets/concesionarios/dimasa.jpeg",
      type: "concesionario",
    },
    // Añade más marcas según necesites
  ];
  // Filtra los autos nuevos cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    // Simula una llamada API
    setTimeout(() => {
      const filteredCars = mockNewCars.filter(
        (car) => car.condition === "nuevo"
      );
      setNewCars(filteredCars);
      setLoading(false);
    }, 500); // Retraso más corto para simular carga
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleSearch = (filters: any) => {
    setLoading(true);
    setTimeout(() => {
      // Filtra primero por condición "new" y luego aplica otros filtros
      const filteredByCondition = mockNewCars.filter(
        (car) => car.condition === "nuevo"
      );
      let results = filteredByCondition;

      setNewCars(results);
      setLoading(false);
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Usa el setter con una función para evitar problemas de cierre
  };
  const { countryCode } = useParams<{ countryCode?: string }>();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PASO CLAVE: Pasa la función toggleMobileMenu al Header */}
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />

      {/* RENDERIZA MobileSidebar fuera del div pt-[80px] si es un overlay */}
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      <div className="pt-[80px]">
        {" "}
        {/* Este padding es para el contenido principal, no para el sidebar */}
        {/* Puedes tener un Hero específico para autos nuevos o quitarlo */}
        <Hero
          title="Autos Nuevos para Ti"
          subtitle="Explora la más reciente colección de vehículos 0 km."
          // Si tu Hero acepta showSearch, puedes pasarlo aquí
          // showSearch={false} // O true, según necesites el buscador en el hero para esta página
        />{" "}
        <SecondaryCTA
          sectionTextColor="brand-primary"
          buttonBgColor="bg-brand-primary"
          sectionBgColor="bg-white"
          buttonTextColor="bg-brand-primary"
        />
        <BrandShowCase brandLogos={brandLogos} />
        {/* Aquí podrías poner el HowItWorks o SecondaryCTA si aplican también a esta página */}
        {/* <HowItWorks /> */}
        {/* <SecondaryCTA
          sectionTextColor="brand-primary"
          buttonBgColor="bg-brand-primary"
          sectionBgColor="bg-white"
          buttonTextColor="text-white"
          title="¿Quieres vender tu coche nuevo?"
          subtitle="Publica tu vehículo con nosotros y llega a miles de compradores potenciales."
          buttonText="Vender Ahora"
          buttonLink="/publicar"
        /> */}
        <main className="mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Columna Izquierda: Filtros y Anuncio Lateral 1 */}
            <div className="lg:col-span-1 space-y-8">
              {/* Puedes pasar la categoría "new_cars" por defecto al SearchFilters */}
              <SearchFilters
                onSearch={handleSearch}
                initialCategory="new_cars"
                lockCategory={true}
              />
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",
                    },
                    {
                      src: "/assets/meguiar.jpg",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Columna Central: Grid de Carros (ocupa más espacio) */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Vehículos Nuevos Destacados
                </h2>
                <p className="text-gray-600">
                  {newCars.length} autos nuevos disponibles
                </p>
              </div>
              <CarGrid cars={newCars} loading={loading} />
            </div>

            {/* Columna Derecha: Anuncio Lateral 2 */}
            {/*<div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",
                  },
                  {
                    src: "/assets/castrol.png",
                  },
                ]}
              />
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",
                  },
                  {
                    src: "/assets/meguiar.jpg",
                  },
                ]}
              />{" "}
            </div>*/}
          </div>{" "}
          {/* Anuncio Banner Inferior */}
          {
            <div className="mt-8">
              <AdvertisementCarousel
                slides={[
                  {
                    src: "/assets/tesla.svg",

                    badge: "",
                  },
                  {
                    src: "/assets/toyotaxl.png",

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

export default NewCarsPage;

import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BusinessCTA from "@/components/BusinessCTA";
import SecondaryCTA from "@/components/SecondaryCTA";
import MobileSidebar from "@/components/MobileSidebar";
import BrandShowCase from "@/components/UsedCarGrid";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import { getVehiclesByFeatures } from "@/api/urls/vehicle";
import { useApiGet } from "@/api/config/customHooks";
import useVehicleStore from "@/store/vehicleStore";
import Hero from "@/components/Hero";
interface BrandLogo {
  id: number;
  name: string;
  src: string;
  type: string;
}

const NewCarsPage: React.FC = () => {
  const { vehicles, setVehicles, setLoading } = useVehicleStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentFilters, setCurrentFilters] = React.useState({
    condition: "new",
    featured: true,
  });

  const { countryCode } = useParams<{ countryCode?: string }>();
  const location = useLocation();

  const brandLogos: BrandLogo[] = [
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
    },
    {
      id: 3,
      name: "DIMASA",
      src: "/assets/concesionarios/dimasa.jpeg",
      type: "concesionario",
    },
  ];

  const { data, isSuccess, isPending, refetch } = useApiGet(
    ["getVehiclesByFeatures", "newCars"],
    () => getVehiclesByFeatures({ condition: "new", featured: true }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  // 🔹 Initial fetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  // 🔹 Refetch when navigation changes (only for autos-nuevos)
  useEffect(() => {
    if (location.pathname.includes("/autos-nuevos")) {
      refetch();
    }
  }, [location, refetch]);

  // 🔹 Update global vehicle state
  useEffect(() => {
    setLoading(isPending);
    if (isSuccess && data) setVehicles(data);
  }, [isPending, isSuccess, data]);

  const handleSearch = (filters: any) => {
    setCurrentFilters({ ...filters, condition: "new" });
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        currentCountryCode={countryCode}
      />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="pt-[80px]">
        <Hero
          title="Autos Nuevos para Ti"
          subtitle="Explora la más reciente colección de vehículos 0 km."
        />
        {/* 🔹 HERO PRINCIPAL */}
        <div className="">
          <SecondaryCTA
            backgroundImage="/assets/mundo/howItWorks.webp"
            buttonBgColor="bg-brand-primary"
            buttonTextColor="text-white"
            sectionTextColor="text-white"
          />
        </div>
        {/* 🔹 CTA PARA NEGOCIOS */}
        <BusinessCTA />
        {/* 🔹 CONCESIONARIOS / MARCAS */}
        <BrandShowCase brandLogos={brandLogos} />
        {/* 🔹 FILTROS Y VEHÍCULOS */}
        <main className="mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Panel lateral */}
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters condition="new" onSearch={handleSearch} />
              <div className="hidden lg:block">
                <AdvertisementCarouselLateral
                  ads={[
                    { src: "/assets/meguiarSpray.jpg" },
                    { src: "/assets/meguiar.jpg" },
                  ]}
                />
              </div>
            </div>

            {/* Vehículos */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  Vehículos Nuevos
                </h2>
                <p className="text-text-secondary">
                  {vehicles.length} autos nuevos disponibles
                </p>
              </div>
              <CarGrid />
            </div>
          </div>

          {/* 🔹 Carrusel inferior */}
          <div className="mt-10">
            <AdvertisementCarousel
              slides={[
                { src: "/assets/tesla.svg" },
                { src: "/assets/toyotaxl.png" },
              ]}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default NewCarsPage;

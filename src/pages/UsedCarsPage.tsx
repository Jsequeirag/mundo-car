import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA";
import MobileSidebar from "../components/MobileSidebar";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
import { getVehiclesByFeatures } from "../api/urls/vehicle";
import { useApiGet } from "../api/config/customHooks";
import UsedCarGrid from "@/components/UsedCarGrid";
import useVehicleStore from "@/store/vehicleStore";
import BusinessCTA from "../components/BusinessCTA";

interface BrandLogo {
  id: string;
  name: string;
  src: string;
  type: string;
}

const UsedCarsPage: React.FC = () => {
  const { vehicles, setVehicles, setLoading } = useVehicleStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { countryCode } = useParams<{ countryCode?: string }>();
  const location = useLocation();

  const brandLogos: BrandLogo[] = [
    {
      id: "1",
      name: "AutoLote El Sol",
      src: "/assets/autolotes/logo-elsol.png",
      type: "autolote",
    },
    {
      id: "2",
      name: "AutoLote La Estrella",
      src: "/assets/autolotes/logo-laestrella.png",
      type: "autolote",
    },
    {
      id: "3",
      name: "AutoLote Premium",
      src: "/assets/autolotes/logo-premium.png",
      type: "autolote",
    },
  ];

  // 🔹 Fetch de vehículos destacados
  const { data, isSuccess, isPending, refetch } = useApiGet(
    ["getVehiclesByFeatures"],
    () => getVehiclesByFeatures({ condition: "used", featured: true }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  // 🔹 Fetch inicial
  useEffect(() => {
    refetch();
  }, [refetch]);

  // 🔹 Refetch si cambia la URL
  useEffect(() => {
    if (location.pathname.includes("/used-cars")) {
      refetch();
    }
  }, [location, refetch]);

  // 🔹 Manejo de estado de carga
  useEffect(() => {
    if (isPending) setLoading(true);
    else if (isSuccess && data) {
      setVehicles(data);
      setLoading(false);
    } else setLoading(false);
  }, [isPending, isSuccess, data, setVehicles, setLoading]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-brand-bg text-text-main">
      {/* 🔹 HEADER */}
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

      {/* 🔹 HERO MODERNO */}
      <div className="pt-[80px]">
        <Hero
          title="Autos Usados de Calidad"
          subtitle="Encuentra vehículos confiables con las mejores ofertas y verificación garantizada."
        />

        {/* 🔹 CTA PROMOCIONAL */}
        <SecondaryCTA
          sectionBgColor="bg-brand-card"
          sectionTextColor="text-text-main"
          buttonBgColor="bg-brand-primary"
          buttonTextColor="text-white"
        />

        {/* 🔹 CTA EMPRESARIAL */}
        <BusinessCTA />

        {/* 🔹 MARCAS */}
        <UsedCarGrid brandLogos={brandLogos} />

        {/* 🔹 CONTENIDO PRINCIPAL */}
        <main className="mx-auto px-6 py-12 border-t border-brand-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {/* FILTROS Y ADS */}
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters
                condition="used"
                className="bg-brand-form rounded-2xl shadow-sm border border-brand-primary/10"
              />
              <div className="hidden lg:block">
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
                  className="bg-brand-card rounded-2xl shadow-sm border border-brand-primary/10 p-3"
                />
              </div>
            </div>

            {/* VEHÍCULOS */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-brand-primary mb-1">
                  Autos Usados Destacados
                </h2>
                <p className="text-text-secondary">
                  {vehicles.length} autos disponibles en tu país
                </p>
              </div>

              <CarGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
            </div>
          </div>

          {/* 🔹 CARRUSEL DE ANUNCIOS */}
          <div className="mt-12">
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
        </main>
      </div>

      {/* 🔹 FOOTER */}
      <Footer />
    </div>
  );
};

export default UsedCarsPage;

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
import BrandShowCase from "@/components/BrandShowCase";
import useVehicleStore from "@/store/vehicleStore";

interface BrandLogo {
  id: string;
  name: string;
  src: string;
  type: string;
}

interface Ad {
  src: string;
  ctaHref: string;
  badge?: string;
}

const UsedCarsPage: React.FC = () => {
  const { vehicles, setVehicles, setLoading } = useVehicleStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { countryCode } = useParams<{ countryCode?: string }>();

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
  const location = useLocation();
  const { data, isSuccess, isPending, refetch } = useApiGet(
    ["getVehiclesByFeatures"],
    () => getVehiclesByFeatures({ condition: "used", featured: true }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // Disable auto-fetch; we'll control it manually
      enabled: false,
    }
  );

  // Initial fetch when component mounts
  useEffect(() => {
    // Trigger initial fetch
    refetch();
  }, [refetch]); // Run once on mount

  // Refetch data when the location changes, specific to this page
  useEffect(() => {
    // Refetch only if the current page is /used-cars
    if (location.pathname.includes("/used-cars")) {
      console.log("Refetching data for UsedCarsPage:", location.pathname); // Debug
      refetch();
    }
  }, [location, refetch]);

  // Update state based on API response
  useEffect(() => {
    console.log(
      "API Response - isPending:",
      isPending,
      "isSuccess:",
      isSuccess,
      "data:",
      data
    ); // Debug
    if (isPending) {
      setLoading(true);
    } else if (isSuccess && data) {
      setVehicles(data);
      setLoading(false);
    } else {
      setLoading(false); // Reset loading on error or no data
    }
  }, [isPending, isSuccess, data]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <div className="pt-[80px]">
        <Hero
          title="Autos Usados de Calidad"
          subtitle="Encuentra vehículos confiables con las mejores ofertas y verificación garantizada."
        />
        <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
        <SecondaryCTA
          sectionTextColor="brand-primary"
          buttonBgColor="bg-brand-primary"
          sectionBgColor="bg-white"
          buttonTextColor="bg-brand-primary"
        />
        <BrandShowCase brandLogos={brandLogos} />
        <main className="mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <SearchFilters condition="used" />
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
                />
              </div>
            </div>
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Vehículos Usado
                </h2>
                <p className="text-gray-600">
                  {vehicles.length} autos usados disponibles
                </p>
              </div>
              <CarGrid /> {/* Pass vehicles as prop */}
            </div>
          </div>
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
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UsedCarsPage;

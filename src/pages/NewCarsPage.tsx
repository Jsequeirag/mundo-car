import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import Footer from "@/components/Footer";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import BlogPreview from "@/components/BlogPreview";
import Hero from "@/components/Hero";
import SecondaryCTA from "@/components/SecondaryCTA";
import MobileSidebar from "../components/MobileSidebar";
import AdvertisementCarouselLateral from "../components/AdvertisementCarouselLateral";
import BrandShowCase from "@/components/BrandShowCase";
import { getVehiclesByFeatures } from "../api/urls/vehicle";
import { useApiGet } from "../api/config/customHooks";
import useVehicleStore from "@/store/vehicleStore";

interface BrandLogo {
  id: number;
  name: string;
  src: string;
  type: string;
}

interface Ad {
  src: string;
  ctaHref?: string;
  badge?: string;
}

const NewCarsPage: React.FC = () => {
  const { vehicles, setVehicles, setLoading } = useVehicleStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentFilters, setCurrentFilters] = React.useState<{
    searchTerm?: string;
    priceRange?: [number, number];
    yearRange?: [number, number];
    department?: string;
    service?: string;
    make?: string;
    model?: string;
    transmission?: string;
    condition?: string;
    featured?: boolean;
  }>({ condition: "new", featured: true });

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
    ["getVehiclesByFeatures"],
    () => getVehiclesByFeatures({ condition: "new", featured: true }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // Ensure initial data fetch
      enabled: false, // Disable auto-fetch; we'll control it manually
    }
  );

  // Initial fetch and refetch on page change
  useEffect(() => {
    // Trigger initial fetch when component mounts
    refetch();
  }, [refetch]); // Run once on mount

  useEffect(() => {
    // Refetch data when the location (page) changes, but only for this page
    if (location.pathname.includes("/new-cars")) {
      console.log("Refetching data for NewCarsPage:", location.pathname); // Debug
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

  const handleSearch = (filters: {
    searchTerm?: string;
    priceRange?: [number, number];
    yearRange?: [number, number];
    department?: string;
    service?: string;
    make?: string;
    model?: string;
    transmission?: string;
    condition?: string;
  }) => {
    setCurrentFilters({ ...filters, condition: "new" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
        <Hero
          title="Autos Nuevos para Ti"
          subtitle="Explora la más reciente colección de vehículos 0 km."
        />
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
              <SearchFilters condition="new" onSearch={handleSearch} />
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    { src: "/assets/meguiarSpray.jpg" },
                    { src: "/assets/meguiar.jpg" },
                  ]}
                />
              </div>
            </div>
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Vehículos Nuevos
                </h2>
                <p className="text-gray-600">
                  {vehicles.length} autos nuevos disponibles
                </p>
              </div>
              <CarGrid /> {/* Pass vehicles as prop */}
            </div>
          </div>
          <div className="mt-8">
            <AdvertisementCarousel
              slides={[
                { src: "/assets/tesla.svg", badge: "" },
                { src: "/assets/toyotaxl.png", badge: "" },
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

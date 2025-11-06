import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  User,
  Menu,
  Home,
  Package,
  PlusCircle,
  Megaphone,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Flag from "react-flagkit";
import useCountryStore from "@/store/countryStore";
import ModalContainer from "../components/Modals/ModalContainer";
import PlansGrid from "@/components/PlanCard/PlansGrid";

interface HeaderProps {
  onMenuClick?: () => void;
  currentCountryCode?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  currentCountryCode = "HN",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const {
    countries,
    countryLoaded,
    setCountries,
    setLoading: setCountriesLoading,
  } = useCountryStore();

  const [selectedCountry, setSelectedCountry] = React.useState(
    currentCountryCode.toUpperCase()
  );

  React.useEffect(() => {
    if (!countryLoaded) {
      const fetchCountries = async () => {
        try {
          setCountriesLoading(true);
          const res = await fetch("/api/countries");
          const data = await res.json();
          setCountries(data);
        } catch (err) {
          console.error("Error al cargar países:", err);
        } finally {
          setCountriesLoading(false);
        }
      };
      fetchCountries();
    }
  }, [countryLoaded, setCountries, setCountriesLoading]);

  React.useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) setSelectedCountry(saved.toUpperCase());
  }, []);

  React.useEffect(() => {
    localStorage.setItem("selectedCountry", selectedCountry);
  }, [selectedCountry]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const navItems = [
    { id: "", label: "Inicio", icon: Home, href: getCountryPath("") },
    {
      id: "usedCars",
      label: "Autos Usados",
      icon: Car,
      href: getCountryPath("/autos-usados"),
    },
    {
      id: "newCars",
      label: "Autos Nuevos",
      icon: Car,
      href: getCountryPath("/autos-nuevos"),
    },
    {
      id: "rentCars",
      label: "Renta de Autos",
      icon: Car,
      href: getCountryPath("/renta"),
    },
    {
      id: "autoParts",
      label: "Autorepuestos",
      icon: Package,
      href: getCountryPath("/repuestos"),
    },
    {
      id: "postYourCar",
      label: "Publica tu Automóvil",
      icon: PlusCircle,
      href: getCountryPath("/publicar"),
    },
    {
      id: "promoteYourBusiness",
      label: "Promociona tu negocio",
      icon: Megaphone,
      href: getCountryPath("/promocionarnegocio"),
    },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  if (!countryLoaded) {
    return (
      <header className="fixed w-full top-0 z-50 bg-brand-primary text-white py-5 flex justify-center">
        <p className="text-white/90 text-sm">Cargando países...</p>
      </header>
    );
  }

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out backdrop-blur-[6px]
      bg-gradient-to-r from-brand-primary via-brand-hover to-[#012f36]
      text-white shadow-lg ${
        isScrolled ? "py-3 shadow-xl bg-opacity-90" : "py-5 bg-opacity-100"
      }`}
    >
      {/* 🪟 Modal para planes */}
      <ModalContainer
        title="Selecciona tu plan según tu necesidad"
        width="80rem"
        maxWidth="95%"
        className="max-w-7xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PlansGrid />
      </ModalContainer>
      <div className="px-4 h-full flex flex-wrap items-center justify-start gap-x-6 gap-y-3">
        {/* 🔹 Logo con efecto premium */}
        <div className="flex items-center flex-shrink-0">
          <div className="bg-white/85 backdrop-blur-sm p-1.5 rounded-md shadow-lg transition-transform duration-300 hover:scale-105">
            <Link to={getCountryPath("/")}>
              <img
                src="/assets/mundocar-logo.png"
                alt="Mundocar Logo"
                className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>
        </div>

        {/* 🔹 Menú principal */}
        <nav className="hidden md:flex flex-wrap justify-start flex-1 gap-x-2 gap-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                onClick={() => {
                  if (item.id === "postYourCar") setIsOpen(true);
                }}
                variant="ghost"
                className="flex items-center space-x-2 transition-colors text-white/95 hover:bg-white/20 hover:text-white rounded-md"
                asChild
              >
                <Link to={(item.id === "postYourCar") === false && item.href}>
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* 🔹 Zona derecha */}
        <div className="flex items-center space-x-1 flex-shrink-0 ml-auto">
          <Link to={getCountryPath("/inicio")} className="hidden md:flex">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <User className="h-5 w-5 mr-2" />
              <span className="font-medium text-sm lg:text-base">Cuenta</span>
            </Button>
          </Link>

          {/* Selector de país */}
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-4 bg-white/20 rounded-md"
              onClick={toggleDropdown}
            >
              <Flag
                country={selectedCountry}
                size={30}
                className="rounded-sm shadow-md"
              />
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-xl z-50">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country.code);
                      setIsDropdownOpen(false);
                      window.location.href = `/${country.code.toLowerCase()}/`;
                    }}
                    className={`w-full px-4 py-4 flex justify-center hover:bg-brand-primary hover:text-white transition-colors ${
                      selectedCountry === country.code
                        ? "bg-brand-primary/10"
                        : ""
                    }`}
                  >
                    <Flag
                      country={country.code}
                      size={30}
                      className="rounded-sm"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menú móvil */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20 hover:text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

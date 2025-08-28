import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, User, Menu, Home, Package, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { useParams } from "react-router-dom";
interface HeaderProps {
  onMenuClick?: () => void;
  currentCountryCode?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  currentCountryCode = "HN",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    currentCountryCode.toUpperCase()
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Lista de países de Centroamérica con códigos ISO 3166-1 alpha-2
  const centralAmericaCountries = [{ code: "HN", name: "Honduras" }];

  // Función auxiliar para construir las URLs con el prefijo del país
  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };
  const navItems = [
    { type: "link", label: "Inicio", icon: Home, href: getCountryPath("") },
    {
      type: "link",
      label: "Autos Nuevos",
      icon: Car,
      href: getCountryPath("/autos-nuevos"),
    },
    {
      type: "link",
      label: "Autos Usados",
      icon: Car,
      href: getCountryPath("/autos-usados"),
    },
    {
      type: "link",
      label: "Autorepuestos",
      icon: Package,
      href: getCountryPath("/repuestos"),
    },
    {
      type: "link",
      label: "Renta de Autos",
      icon: Car,
      href: getCountryPath("/renta"),
    },
    {
      type: "link",
      label: "Publicar Anuncio",
      icon: PlusCircle,
      href: getCountryPath("/publicar"),
    },
  ];

  // Manejar el clic para abrir/cerrar el dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.querySelector(".dropdown-container");
      if (dropdown && !dropdown.contains(target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Persistir la selección del país en localStorage
  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) setSelectedCountry(savedCountry);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCountry", selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed w-full top-0 z-50 transition-all duration-300 ease-in-out
        bg-brand-primary text-white shadow-lg
        animate-slide-in
        ${isScrolled ? "py-4" : "py-6"}
        ${isScrolled ? "md:h-20" : "md:h-24"}
        ${isScrolled ? "md:shadow-xl" : "md:shadow-lg"}
      `}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <div className="bg-white/85 backdrop-blur-sm p-1 rounded-md shadow-lg">
            <Link to={getCountryPath("/")}>
              <img
                src="/assets/mundocar-logo.png"
                className="w-32 h-auto md:w-36 lg:w-40 drop-shadow-lg logo-glow"
                alt="Mundocar Logo"
              />
            </Link>
          </div>
        </div>

        {/* Ítems de Navegación */}
        <nav className="hidden md:flex flex-1 justify-center space-x-3 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`
                  flex items-center space-x-2 transition-colors
                  ${
                    item.label === "Publicar Anuncio"
                      ? "text-green-300 hover:bg-green-500/20 hover:text-green-200"
                      : "text-white hover:bg-white/20 hover:text-white"
                  }
                `}
                asChild
              >
                <Link to={item.href}>
                  <Icon
                    className={`
                      h-5 w-5
                      ${
                        item.label === "Publicar Anuncio"
                          ? "text-green-300"
                          : ""
                      }
                    `}
                  />
                  <span className="font-medium text-sm lg:text-base">
                    {item.label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Botones del lado derecho (Cuenta, Selector de País y Menú Móvil) */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Link to={getCountryPath("/inicio")} className="hidden md:flex">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <User className="h-5 w-5 mr-2" />
              <span className="font-medium text-sm lg:text-base">Cuenta</span>
            </Button>
          </Link>

          {/* Selector de País */}
          <div className="relative dropdown-container hidden md:block">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-4 bg-white/20 rounded-md"
              onClick={toggleDropdown}
              aria-label={
                centralAmericaCountries.find((c) => c.code === selectedCountry)
                  ?.name
              }
            >
              <Flag
                country={selectedCountry}
                size={30}
                className="rounded-sm shadow-md"
              />
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-xl z-50">
                {centralAmericaCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      w-full px-4 py-4 flex justify-center
                      hover:bg-brand-primary hover:text-white transition-colors
                      ${
                        selectedCountry === country.code
                          ? "bg-brand-primary/10"
                          : ""
                      }
                    `}
                    aria-label={country.name}
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

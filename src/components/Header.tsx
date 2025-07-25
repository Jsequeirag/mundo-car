import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car,
  Search,
  Heart,
  User,
  Menu,
  Wrench, // Icono no usado en navItems, pero importado
  MapPin,
  Package,
  Droplets,
} from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Define los ítems de navegación
  const navItems = [
    { label: "Autos nuevos", icon: Car, href: "/autos-nuevos" },
    { label: "Autos usados", icon: Car, href: "/autos-usados" },
    { label: "Renta de autos", icon: MapPin, href: "/renta" },
    { label: "Autorepuestos", icon: Package, href: "/repuestos" },
    { label: "Lubicentros", icon: Droplets, href: "/lubicentros" },
  ];

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
        animate-slide-in // Animación de deslizamiento
        ${
          isScrolled ? "py-2" : "py-4"
        } // Menor padding vertical al hacer scroll
        ${
          isScrolled ? "md:h-16" : "md:h-20"
        } // Altura fija o ligeramente menor para desktop
        ${
          isScrolled ? "md:shadow-xl" : "md:shadow-lg"
        } // Ajuste de sombra al encoger
      `}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div
            className={`bg-white p-2 rounded-sm transition-all duration-300`}
          >
            <img
              src="/assets/mundocar-logo.png"
              className="w-32 h-auto md:w-full lg:w-full" // Ajusta estos valores
              alt="Mundocar Logo"
            />
          </div>
        </div>
        {/* Ítems de Navegación (reemplaza la barra de búsqueda en desktop) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8 px-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="flex items-center space-x-2 text-white hover:bg-white/20 hover:text-white transition-colors"
                asChild
              >
                <a href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm lg:text-base">
                    {item.label}
                  </span>
                </a>
              </Button>
            );
          })}
        </nav>

        {/* Botones del lado derecho (Favoritos, Cuenta, Menú Móvil) */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex text-white hover:bg-white/20 hover:text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            Favoritos
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex text-white hover:bg-white/20 hover:text-white"
          >
            <User className="h-4 w-4 mr-2" />
            Cuenta
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20 hover:text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

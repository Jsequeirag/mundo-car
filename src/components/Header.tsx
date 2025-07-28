// components/Header.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  Search,
  Heart,
  User,
  Menu,
  Home,
  Wrench,
  MapPin,
  Package,
  Droplets,
  PlusCircle,
  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { type: "link", label: "Inicio", icon: Home, href: "/" },
    {
      type: "dropdown",
      label: "Autos",
      icon: Car,
      subItems: [
        { label: "Autos nuevos", href: "/autos-nuevos" },
        { label: "Autos usados", href: "/autos-usados" },
        { label: "Renta de autos", href: "/renta" },
      ],
    },
    { type: "link", label: "Autorepuestos", icon: Package, href: "/repuestos" },
    {
      type: "link",
      label: "Lubricentros",
      icon: Droplets,
      href: "/lubricentros",
    },
    { type: "link", label: "Publicar", icon: PlusCircle, href: "/publicar" },
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
        animate-slide-in
        ${isScrolled ? "py-2" : "py-4"}
        ${isScrolled ? "md:h-16" : "md:h-20"}
        ${isScrolled ? "md:shadow-xl" : "md:shadow-lg"}
      `}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div
            className={`bg-white p-2 rounded-sm transition-all duration-300`}
          >
            <a href="/">
              <img
                src="/assets/mundocar-logo.png"
                className="w-24 h-auto md:w-32 lg:w-40"
                alt="Mundocar Logo"
              />
            </a>
          </div>
        </div>

        {/* Ítems de Navegación */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8 px-8">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              const Icon = item.icon;
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-white hover:bg-white/20 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm lg:text-base">
                        {item.label}
                      </span>
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  {/* AQUÍ LOS CAMBIOS PARA UN MENÚ MÁS ELEGANTE */}
                  <DropdownMenuContent
                    className="
                      w-56 bg-white border border-gray-100 rounded-lg shadow-xl // Bordes más suaves, sombra más pronunciada y sutil
                      text-gray-800 p-2 // Mayor padding interno
                      z-[60] // Asegura que esté por encima
                      transform origin-top-right // Para la animación de escalado/fade
                      transition-all duration-200 ease-out // Animación de entrada
                      data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 // Animaciones de shadcn
                      data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2 // Animaciones de salida
                    "
                  >
                    {item.subItems?.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <a
                          href={subItem.href}
                          className="
                            flex items-center px-3 py-2 rounded-md
                            text-sm font-medium // Texto más definido
                            text-gray-700 hover:bg-brand-primary hover:text-white // Colores de hover más atractivos
                            transition-colors duration-150 cursor-pointer
                          "
                        >
                          {subItem.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

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

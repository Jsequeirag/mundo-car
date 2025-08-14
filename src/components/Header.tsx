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
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom"; // CAMBIO CLAVE: Importa Link de react-router-dom

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick?: () => void;
  currentCountryCode?: string; // NUEVA PROP: Para saber qué país está activo
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, currentCountryCode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Función auxiliar para construir las URLs con el prefijo del país
  const getCountryPath = (path: string) => {
    // Si no hay código de país (ej. en la página de selección de país),
    // o si el path ya es la raíz '/', simplemente devuelve el path tal cual
    if (!currentCountryCode || path === "/") {
      return path;
    }
    // Si el path es relativo y no empieza con '/', asume que es una sub-ruta del país
    // Esto es útil si tus rutas en App.tsx son como "autos-nuevos" dentro de /:countryCode
    if (path.startsWith("/")) {
      return `/${currentCountryCode}${path}`;
    }
    // Si el path es relativo sin barra inicial (menos común en hrefs, pero por si acaso)
    return `/${currentCountryCode}/${path}`;
  };

  const navItems = [
    { type: "link", label: "Inicio", icon: Home, href: getCountryPath("") }, // Usa la función auxiliar
    {
      type: "dropdown",
      label: "Autos",
      icon: Car,
      subItems: [
        { label: "Autos nuevos", href: getCountryPath("/autos-nuevos") }, // Usa la función auxiliar
        { label: "Autos usados", href: getCountryPath("/autos-usados") }, // Usa la función auxiliar
        { label: "Renta de autos", href: getCountryPath("/renta") }, // Usa la función auxiliar
      ],
    },
    {
      type: "link",
      label: "Autorepuestos",
      icon: Package,
      href: getCountryPath("/repuestos"),
    }, // Usa la función auxiliar
    {
      type: "link",
      label: "Lubricentros",
      icon: Droplets,
      href: getCountryPath("/lubricentros"), // Usa la función auxiliar
    },
    {
      type: "link",
      label: "Publicar",
      icon: PlusCircle,
      href: getCountryPath("/inicio"),
    }, // Usa la función auxiliar
    // Puedes añadir más elementos si tienes Blog, Contacto, etc.
    // { type: "link", label: "Blog", icon: Rss, href: getCountryPath("/blog") },
    // { type: "link", label: "Contacto", icon: Mail, href: getCountryPath("/contacto") },
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
          <div className="bg-white/85 backdrop-blur-sm p-2 rounded-sm shadow-lg">
            <Link to={getCountryPath("/")}>
              <img
                src="/assets/mundocar-logo.png"
                className="w-24 h-auto md:w-32 lg:w-40 drop-shadow-lg  logo-glow"
                alt="Mundocar Logo"
              />
            </Link>
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
                  <DropdownMenuContent
                    className="
                      w-56 bg-white border border-gray-100 rounded-lg shadow-xl
                      text-gray-800 p-2
                      z-[60]
                      transform origin-top-right
                      transition-all duration-200 ease-out
                      data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2
                      data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2
                    "
                  >
                    {item.subItems?.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        {/* CAMBIO: Usa Link de react-router-dom para los sub-items */}
                        <Link
                          to={subItem.href}
                          className="
                            flex items-center px-3 py-2 rounded-md
                            text-sm font-medium
                            text-gray-700 hover:bg-brand-primary hover:text-white
                            transition-colors duration-150 cursor-pointer
                          "
                        >
                          {subItem.label}
                        </Link>
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
                {/* CAMBIO: Usa Link de react-router-dom para los ítems de navegación directos */}
                <Link to={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm lg:text-base">
                    {item.label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Botones del lado derecho (Favoritos, Cuenta, Menú Móvil) */}
        <div className="flex items-center space-x-2">
          {/* CAMBIO: Usa Link de react-router-dom para Favoritos y Cuenta */}
          <Link to={getCountryPath("/favoritos")} className="hidden md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favoritos
            </Button>
          </Link>
          <Link to={getCountryPath("/inicio")} className="hidden md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Cuenta
            </Button>
          </Link>{" "}
          <Link to={getCountryPath("/")} className="hidden md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={() => {
                localStorage.removeItem("selectedCountryCode");
              }}
            >
              <LogOut className="h-4 w-4 mr-2 text-red-400" />
              <p className="text-red-400">Salir</p>
            </Button>
          </Link>
          {/* Si tu login es una página separada, también debería usar getCountryPath */}
          {/* <Link to={getCountryPath("/login")} className="hidden md:flex">
            <Button
              variant="default"
              size="sm"
              className="bg-white text-brand-primary hover:bg-gray-100"
            >
              Iniciar Sesión
            </Button>
          </Link> */}
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

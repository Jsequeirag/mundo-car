import React from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  Package,
  MapPin,
  Droplets,
  PlusCircle,
  Megaphone,
  Home,
} from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const location = useLocation();

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const navItems = [
    { label: "Inicio", icon: Home, href: getCountryPath("/") },
    { label: "Autos Usados", icon: Car, href: getCountryPath("/autos-usados") },
    { label: "Autos Nuevos", icon: Car, href: getCountryPath("/autos-nuevos") },
    { label: "Renta de Autos", icon: MapPin, href: getCountryPath("/renta") },
    {
      label: "Autorepuestos",
      icon: Package,
      href: getCountryPath("/repuestos"),
    },
    {
      label: "Lubricentros",
      icon: Droplets,
      href: getCountryPath("/lubicentros"),
    },
    {
      label: "Publica tu Automóvil",
      icon: PlusCircle,
      href: getCountryPath("/publicar"),
    },
    {
      label: "Promociona tu Negocio",
      icon: Megaphone,
      href: getCountryPath("/promociona"),
    },
  ];

  return (
    <nav
      className="sticky top-[70px] md:top-[80px] z-40 
                 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.href);

            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`flex items-center space-x-2 text-sm font-medium rounded-md transition-all duration-200 
                ${
                  isActive
                    ? "text-brand-primary bg-brand-hover/10 shadow-sm"
                    : "text-text-main hover:text-brand-primary hover:bg-brand-hover/5"
                }`}
                asChild
              >
                <Link to={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

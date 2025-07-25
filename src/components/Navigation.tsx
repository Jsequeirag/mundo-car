import React from "react";
import { Button } from "@/components/ui/button";
import { Car, Wrench, MapPin, Package, Droplets } from "lucide-react";

const Navigation: React.FC = () => {
  const navItems = [
    { label: "Autos nuevos", icon: Car, href: "/autos-nuevos" },
    { label: "Autos usados", icon: Car, href: "/autos-usados" },
    { label: "Renta de autos", icon: MapPin, href: "/renta" },
    { label: "Autorepuestos", icon: Package, href: "/repuestos" },
    { label: "Lubicentros", icon: Droplets, href: "/lubicentros" },
  ];

  return (
    // CAMBIOS AQUÍ:
    // Hacemos la barra de navegación "sticky"
    // 'top-[calc(theme(spacing.16))]' o 'top-[80px]' asegura que se pegue justo debajo del header principal (altura de 80px)
    // Z-index alto pero menor que el header (z-40) para que no lo cubra.
    <nav className="sticky top-[60px] md:top-[64px] z-40 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 hover:text-brand-primary hover:bg-brand-primary/10 transition-colors duration-200"
                asChild
              >
                <a href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

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
    // Keeping a white background for the navigation bar provides a clean base.
    // The subtle shadow and border remain, keeping it distinct from the header.
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                // Key Change: Apply brand-primary to hover text and a very light brand color to hover background
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

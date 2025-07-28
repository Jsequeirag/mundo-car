// components/MobileSidebar.tsx
import React from "react";
import {
  X,
  Home,
  Car,
  Package,
  Droplets,
  PlusCircle,
  Heart, // <-- Asegúrate de que estos están importados
  User, // <-- Asegúrate de que estos están importados
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItemsMobile = [
  { label: "Inicio", icon: Home, href: "/" },
  {
    label: "Autos",
    icon: Car,
    subItems: [
      { label: "Autos nuevos", href: "/autos-nuevos" },
      { label: "Autos usados", href: "/autos-usados" },
      { label: "Renta de autos", href: "/renta" },
    ],
  },
  { label: "Autorepuestos", icon: Package, href: "/repuestos" },
  { label: "Lubicentros", icon: Droplets, href: "/lubricentros" },
  { type: "link", label: "Publicar", icon: PlusCircle, href: "/publicar" },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay oscuro (cuando el menú está abierto) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose} // Cierra el menú si se hace clic fuera
        ></div>
      )}

      {/* Menú lateral */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out z-50
          ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } // Controla la entrada/salida
          md:hidden // IMPORTANTE: Solo visible en pantallas pequeñas
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Menú</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {navItemsMobile.map((item) => (
            <div key={item.label}>
              {/* Lógica para mostrar sub-ítems o enlaces directos */}
              {item.subItems ? ( // Si tiene subItems, es el tipo "dropdown"
                <>
                  <a
                    href="#"
                    className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
                    onClick={(e) => e.preventDefault()} // Evita la navegación del padre
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                  <div className="ml-6 flex flex-col space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={onClose} // Cierra el menú al hacer clic en un sub-enlace
                        className="py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                // Enlaces normales
                <a
                  href={item.href}
                  onClick={onClose} // Cierra el menú al hacer clic en un enlace normal
                  className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              )}
            </div>
          ))}
          {/* Enlaces de Favoritos y Cuenta */}
          <a
            href="/favoritos"
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Heart className="h-5 w-5" />
            <span>Favoritos</span>
          </a>
          <a
            href="/cuenta"
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            <span>Cuenta</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;

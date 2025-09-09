import React from "react";
import { X, Home, Car, Package, PlusCircle, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();

  // Función auxiliar para construir las URLs con el prefijo del país
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };

  const navItemsMobile = [
    { label: "Inicio", icon: Home, href: getCountryPath("") },
    {
      label: "Autos",
      icon: Car,
      subItems: [
        { label: "Autos Nuevos", href: getCountryPath("/autos-nuevos") },
        { label: "Autos Usados", href: getCountryPath("/autos-usados") },
        { label: "Renta de Autos", href: getCountryPath("/renta") },
      ],
    },
    {
      label: "Autorepuestos",
      icon: Package,
      href: getCountryPath("/repuestos"),
    },

    {
      label: "Publica tu anuncio",
      icon: PlusCircle,
      href: getCountryPath("/publicar"),
    },
  ];

  return (
    <>
      {/* Overlay oscuro (cuando el menú está abierto) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Menú lateral */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
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
              {item.subItems ? (
                <>
                  <a
                    href="#"
                    className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
                    onClick={(e) => e.preventDefault()}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                  <div className="ml-6 flex flex-col space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        onClick={onClose}
                        className="py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
          <Link
            to={getCountryPath("/favoritos")}
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Heart className="h-5 w-5" />
            <span>Favoritos</span>
          </Link>
          <Link
            to={getCountryPath("/cuenta")}
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            <span>Cuenta</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;

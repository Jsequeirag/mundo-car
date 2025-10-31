import React from "react";
import {
  X,
  Home,
  Car,
  Package,
  PlusCircle,
  Heart,
  User,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
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
      label: "Publica tu Automóvil",
      icon: PlusCircle,
      href: getCountryPath("/publicar"),
    },
  ];

  return (
    <>
      {/* 🔹 Overlay translúcido con degradado y blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gradient-to-br from-[#012f36]/60 via-[#034651]/70 to-[#04606A]/60 
                     backdrop-blur-[2px] transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* 🔸 Panel lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-brand-card text-text-main shadow-2xl border-l border-brand-primary/20
                    transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 rounded-l-2xl
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    md:hidden`}
      >
        {/* 🔸 Header del sidebar */}
        <div className="bg-brand-primary text-white px-5 py-4 flex justify-between items-center rounded-tl-2xl">
          <h2 className="text-lg font-semibold">Menú</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 🔹 Navegación principal */}
        <nav className="flex flex-col p-5 space-y-2 overflow-y-auto max-h-[calc(100%-64px)]">
          {navItemsMobile.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <>
                  <div className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-text-main/90 hover:bg-brand-hover/10">
                    <item.icon className="h-5 w-5 text-brand-primary" />
                    <span>{item.label}</span>
                  </div>
                  <div className="ml-8 flex flex-col space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        onClick={onClose}
                        className="py-2 px-3 text-sm text-text-secondary hover:text-brand-primary hover:bg-brand-card/60 rounded-md transition-colors"
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
                  className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-text-main hover:text-brand-primary hover:bg-brand-hover/10 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-brand-primary" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Favoritos y cuenta */}
          <Link
            to={getCountryPath("/favoritos")}
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-text-main hover:text-brand-primary hover:bg-brand-hover/10 transition-colors"
          >
            <Heart className="h-5 w-5 text-brand-primary" />
            <span>Favoritos</span>
          </Link>
          <Link
            to={getCountryPath("/inicio")}
            onClick={onClose}
            className="flex items-center space-x-2 py-2 px-3 rounded-md font-semibold text-text-main hover:text-brand-primary hover:bg-brand-hover/10 transition-colors"
          >
            <User className="h-5 w-5 text-brand-primary" />
            <span>Cuenta</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;

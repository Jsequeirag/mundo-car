import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, Link } from "react-router-dom";
const Footer: React.FC = () => {
  const { countryCode } = useParams<{ countryCode?: string }>();

  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    return `/${countryCode}${path.startsWith("/") ? path : `/${path}`}`;
  };
  const services = [
    { name: "Autos nuevos", path: "/autos-nuevos" },
    { name: "Autos usados", path: "/autos-usados" },
    { name: "Renta de autos", path: "/renta" },
    { name: "Autorepuestos", path: "/repuestos" },
    { name: "Promociona tu negocio", path: "/publicar" },
  ];

  return (
    <footer className="bg-[#034651]/95 text-white">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 🌎 BRAND */}
          <div className="space-y-4">
            <div className="bg-white/85 backdrop-blur-sm p-2 rounded-md shadow-lg inline-block">
              <img
                src="/assets/mundocar-logo.png"
                alt="MundoCar"
                className="h-14 sm:h-16 w-auto drop-shadow-lg logo-glow transition-transform duration-300 hover:scale-105"
              />
            </div>

            <p className="text-sm text-brand-card leading-relaxed mt-3">
              La plataforma líder para comprar, vender y promocionar vehículos
              en toda la región. Encuentra tu auto ideal con{" "}
              <span className="font-semibold text-white">MundoCar</span>.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-3 pt-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, color: "#1877F2" },
                { icon: <Instagram className="h-4 w-4" />, color: "#E1306C" },
                { icon: <Twitter className="h-4 w-4" />, color: "#1DA1F2" },
                { icon: <Youtube className="h-4 w-4" />, color: "#FF0000" },
              ].map((item, i) => (
                <Button
                  key={i}
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* 🚘 SERVICIOS */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">
              Servicios
            </h4>
            <ul className="space-y-2 text-sm text-brand-card">
              {services.map((s, i) => (
                <li key={i}>
                  <Link
                    to={getCountryPath(s.path)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📞 CONTACTO */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">
              Contacto
            </h4>
            <div className="space-y-2 text-sm text-brand-card">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+506 7078-7117</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@mundocar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San José, Costa Rica</span>
              </div>
            </div>
          </div>

          {/* 📨 NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-white/20 pb-2">
              Newsletter
            </h4>
            <p className="text-sm text-brand-card">
              Recibe las mejores ofertas y novedades directamente en tu correo.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Tu email"
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus-visible:ring-brand-hover"
              />
              <Button className="bg-brand-hover hover:bg-brand-primary text-white font-semibold px-5">
                Suscribir
              </Button>
            </div>
          </div>
        </div>

        {/* 🔹 Línea inferior */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-brand-card">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">MUNDOCAR</span>. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

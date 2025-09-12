import React from "react";
import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center bg-white rounded-lg">
              <img src="/assets/mundocar-logo.png" />
            </div>
            <p className="text-gray-400 text-sm">
              La plataforma líder en venta de autos, repuestos y servicios
              automotrices.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="outline"
                className="p-2 bg-brand-primary"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 bg-brand-primary"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 bg-brand-primary"
              >
                <Instagram className="h-4 w-4 " />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="p-2 bg-brand-primary"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Autos nuevos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Autos usados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Renta de autos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Autorepuestos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lubicentros
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@autotrader.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Auto Street, Car City</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm text-gray-400">
              Recibe las mejores ofertas y novedades
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Tu email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                size="sm"
                className="bg-brand-primary hover:bg-brand-primary/80"
              >
                Suscribir
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} MUNDOCAR. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { hondurasDepartment } from "@/data/hondurasDepartment";

interface Brand {
  id: number;
  name: string;
  src: string;
  type: string;
}

interface UsedCarGridProps {
  brandLogos: Brand[];
}

const UsedCarGrid: React.FC<UsedCarGridProps> = ({ brandLogos }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  const [department, setDepartment] = useState<string>("any");

  return (
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        {/* 🔹 Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-4 tracking-tight">
            {brandLogos[0].type === "concesionario"
              ? "Explorar por Concesionarios"
              : brandLogos[0].type === "autolote"
              ? "Explorar por Autolotes"
              : brandLogos[0].type === "rentacar"
              ? "Explorar por Rentadoras"
              : "Explorar por Opciones"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Selecciona tu ubicación o navega entre las mejores opciones
            disponibles en tu país.
          </p>
        </div>

        {/* 🔹 Filtro de ubicación */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10">
          <Label
            htmlFor="department"
            className="text-text-main font-semibold text-base"
          >
            Ubicación:
          </Label>
          <Select onValueChange={setDepartment} value={department}>
            <SelectTrigger className="w-56 bg-brand-form border border-brand-primary/20 text-text-main focus:ring-brand-primary focus:ring-2 focus:ring-offset-2 hover:border-brand-primary transition-all">
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Cualquiera</SelectItem>
              {hondurasDepartment.map((municipality) => (
                <SelectItem
                  key={municipality}
                  value={municipality.toLowerCase()}
                >
                  {municipality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 🔹 Grid de marcas */}
        <div className="flex flex-wrap justify-center gap-8">
          {brandLogos.map((brand) => (
            <Link
              key={brand.name}
              to={
                brand.type === "concesionario"
                  ? `/${countryCode}/autoBrandPage`
                  : brand.type === "autolote"
                  ? `/${countryCode}/autolote/${brand.id}`
                  : brand.type === "rentacar"
                  ? `/${countryCode}/rentacar/${brand.id}`
                  : `/${countryCode}/`
              }
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-brand-card border border-brand-primary/10 shadow-sm hover:shadow-lg hover:border-brand-primary/40 transition-all duration-300 cursor-pointer w-[230px] h-[210px]"
              onClick={(e) => {
                e.currentTarget.classList.add("click-effect");
                setTimeout(() => {
                  e.currentTarget.classList.remove("click-effect");
                }, 400);
              }}
            >
              {/* Imagen del logo */}
              <img
                src={brand.src}
                alt={`${brand.name} Logo`}
                className="w-32 h-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />

              {/* Nombre */}
              <span className="mt-4 text-sm font-semibold text-text-main group-hover:text-brand-primary transition-colors duration-300">
                {brand.name}
              </span>

              {/* Efecto click suave */}
              <style>
                {`
                  .click-effect {
                    animation: clickAnimation 0.3s ease forwards;
                  }
                  @keyframes clickAnimation {
                    0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
                    10% { transform: scale(0.95); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); }
                    100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
                  }
                `}
              </style>

              {/* Efecto hover de brillo */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-brand-hover/10 to-transparent rounded-2xl transition-all duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsedCarGrid;

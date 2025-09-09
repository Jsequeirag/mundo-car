import React from "react";
import { Link, useParams } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
  src: string;
  type: string;
}

interface BrandShowcaseProps {
  brandLogos: Brand[];
}

const BrandShowcase: React.FC<BrandShowcaseProps> = ({ brandLogos }) => {
  const { countryCode } = useParams<{ countryCode?: string }>();
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
          {brandLogos[0].type === "concesionario"
            ? " Descubre Nuestros Concesionarios"
            : " Descubre Nuestros Autolotes"}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {brandLogos.map((brand) => (
            <Link
              key={brand.name}
              to={
                brand.type === "concesionario"
                  ? `/${countryCode}/autoBrandPage`
                  : `/${countryCode}/autolote/${brand.id}`
              }
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group w-[250px] h-[220px]"
              onClick={(e) => {
                e.currentTarget.classList.add("click-effect");
                setTimeout(() => {
                  e.currentTarget.classList.remove("click-effect");
                }, 400);
              }}
            >
              <img
                src={brand.src}
                alt={`${brand.name} Logo`}
                width={140}
                height={90}
                className="w-32 h-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <span className="mt-4 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {brand.name}
              </span>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

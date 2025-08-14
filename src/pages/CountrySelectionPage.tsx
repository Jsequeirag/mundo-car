import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { centralAmericaCountries } from "@/data/centralAmericaCountries";

const CountrySelectionPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedCountryCode");
      if (saved) navigate(`/${saved}`, { replace: true });
    } catch {}
    if (typeof document !== "undefined") {
      document.title = "Selecciona tu país | MundoCar";
    }
  }, [navigate]);

  const handleSelect = (code: string) => {
    try {
      localStorage.setItem("selectedCountryCode", code);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Contenedor a pantalla completa */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-1">
        {/* Izquierda: video o imagen con overlay y texto */}
        {/* izquierda: selección de país */}
        <div className="bg-white flex items-center justify-center px-6 md:px-10 py-10">
          <div className="w-full max-w-md text-center">
            <p className="text-gray-600 text-xl font-semibold">
              Te damos la bienvenida a
            </p>
            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="mx-auto mt-2 h-10 md:h-12"
              loading="lazy"
            />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-4">
              Estamos en toda Centroamérica
            </h2>
            <p className="text-gray-600 mt-2">
              Selecciona tu país para brindarte una experiencia personalizada.
            </p>

            {/* Botones tipo pill */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {centralAmericaCountries.map((c) => (
                <Link
                  key={c.code}
                  to={c.homePageUrl || `/${c.code}`}
                  onClick={() => handleSelect(c.code)}
                  className="
                    group inline-flex items-center gap-3
                    rounded-xl border border-gray-200 bg-white
                    px-4 py-3 text-left shadow-sm hover:shadow-md
                    hover:border-brand-primary transition
                    focus:outline-none focus:ring-2 focus:ring-brand-primary
                  "
                  aria-label={`Ir a ${c.name}`}
                >
                  <img
                    src={c.flagUrl}
                    alt={`Bandera de ${c.name}`}
                    className="h-6 w-9 rounded-[4px] object-cover ring-1 ring-gray-200"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="font-medium text-gray-800 group-hover:text-brand-primary">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>{" "}
        <div className="relative h-[50vh] lg:h-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            poster="/assets/videos/MundoCar3.mp4"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/MundoCar3.webm" type="video/webm" />
            <source src="/assets/videos/MundoCar3.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Texto centrado verticalmente */}
          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow text-center">
              ¡Apoyamos tu próximo viaje!
            </h1>
            <p className="text-white/90 mt-3 max-w-xl text-center">
              Compra, renta o recibe servicio con una experiencia pensada para
              tu país.
            </p>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="bg-brand-primary text-white py-5 text-center">
        <p className="text-xs opacity-90">
          © {new Date().getFullYear()} MundoCar. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default CountrySelectionPage;

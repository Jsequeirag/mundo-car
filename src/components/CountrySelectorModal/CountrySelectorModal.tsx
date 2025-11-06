import React from "react";
import loadingStore from "@/store/loadingScreenStore";
import useCountryStore from "@/store/countryStore";

const CountrySelectorModal: React.FC = () => {
  const { isCountryModalOpen, setCountryModalOpen } = loadingStore();
  const { countries } = useCountryStore();

  if (!isCountryModalOpen) return null;

  const handleSelect = (countryCode: string) => {
    localStorage.setItem("selectedCountry", countryCode);
    setCountryModalOpen(false);
    window.location.href = `/${countryCode.toLowerCase()}`;
  };

  // 🌄 Imágenes temáticas por país (personalízalas en /public/assets/countries/)
  const countryBackgrounds: Record<string, string> = {
    CR: "/assets/countries/cr-bg.jpg",
    HN: "/assets/countries/hn-bg.jpg",
    SV: "/assets/countries/sv-bg.jpg",
    GT: "/assets/countries/gt-bg.jpg",
    NI: "/assets/countries/ni-bg.jpg",
    PA: "/assets/countries/pa-bg.jpg",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      // ❌ No se cierra al hacer click fuera
    >
      <div
        className="relative w-[85%] max-w-[420px] rounded-2xl overflow-hidden 
                   bg-white/10 backdrop-blur-xl border border-white/10 
                   shadow-2xl p-6 text-center text-white"
      >
        {/* 🌎 Encabezado */}
        <h2 className="text-xl font-semibold text-white/90 mb-1">
          🌎 Selecciona tu país
        </h2>
        <p className="text-xs text-white/70 mb-5">
          Esta selección es necesaria para continuar.
        </p>

        {/* 🏳️ Lista de países - grid adaptativo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c.code)}
              className="relative group overflow-hidden rounded-xl 
                         bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 
                         transition-all duration-300 flex flex-col items-center justify-center py-4"
            >
              {/* Imagen temática */}
              <img
                src={
                  countryBackgrounds[c.code] ||
                  "/assets/countries/default-bg.jpg"
                }
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
              />
              {/* Filtro suave */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

              {/* Bandera + nombre */}
              <div className="relative flex flex-col items-center justify-center">
                <img
                  src={`https://flagcdn.com/32x24/${c.code.toLowerCase()}.png`}
                  alt={c.name}
                  className="rounded-sm shadow-sm mb-1"
                />
                <span className="text-xs font-medium text-white/90">
                  {c.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 🔒 Sin botón de cerrar — debe elegir */}
        <p className="text-[11px] text-white/60 mt-5 italic">
          Selecciona un país para continuar
        </p>
      </div>
    </div>
  );
};

export default CountrySelectorModal;

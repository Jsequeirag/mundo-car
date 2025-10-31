// src/components/CountrySelectorModal.tsx
import React from "react";
import loadingStore from "@/store/loadingScreenStore";
import useCountryStore from "@/store/countryStore";

interface Country {
  code: string;
  name: string;
}

const CountrySelectorModal: React.FC = () => {
  const { isCountryModalOpen, setCountryModalOpen } = loadingStore();
  const { countries } = useCountryStore() as { countries: Country[] };

  if (!isCountryModalOpen) return null;

  const handleSelect = (countryCode: string): void => {
    localStorage.setItem("selectedCountry", countryCode);
    setCountryModalOpen(false);
    window.location.href = `/${countryCode.toLowerCase()}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setCountryModalOpen(false)}
    >
      <div
        className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 w-[85%] max-w-[260px] flex flex-col gap-2 text-center text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm font-semibold text-white/90 mb-1 tracking-wide">
          Selecciona tu país
        </h2>

        <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c.code)}
              className="w-full px-3 py-1.5 rounded-md text-xs border border-white/20 
                         bg-white/10 hover:bg-white/25 hover:border-white/30 transition-colors
                         flex items-center justify-center gap-1.5 text-white/90 font-medium"
            >
              <img
                src={`https://flagcdn.com/24x18/${c.code.toLowerCase()}.png`}
                alt={c.name}
                className="rounded-sm shadow-sm"
                width={24}
                height={18}
              />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelectorModal;

// src/stores/useLanguageStore.ts
import { create } from "zustand";
import useCountryStore from "@/store/countryStore";

// 🌍 Traducciones actuales
const translations = {
  es: {
    CR: { usedCarDealer: "Agencia de Vehículos Usados" },
    HN: { usedCarDealer: "Autolote" },
  },
  en: {
    CR: { usedCarDealer: "Used Vehicle Agency" },
    HN: { usedCarDealer: "Car Lot" },
  },
};

// 🔹 Tipo del estado de tu store
interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  getTranslation: (key: string) => string;
}

// 🌎 Idioma por defecto
const getDefaultLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("appLanguage") || "es";
  }
  return "es";
};

// 🧠 Store tipado
const useLanguageStore = create<LanguageState>((set, get) => ({
  language: getDefaultLanguage(),

  setLanguage: (lang) => {
    set({ language: lang });
    if (typeof window !== "undefined") {
      localStorage.setItem("appLanguage", lang);
    }
  },

  toggleLanguage: () =>
    set((state) => {
      const newLang = state.language === "es" ? "en" : "es";
      if (typeof window !== "undefined") {
        localStorage.setItem("appLanguage", newLang);
      }
      return { language: newLang };
    }),

  getTranslation: (key) => {
    // ✅ Forma segura
    const state = get();
    const language = state.language || "es";

    const langData = translations[language] || translations["es"];
    const countryState = useCountryStore.getState();
    const countries = countryState.countries || [];

    let currentCountry = "CR";
    if (countries.length > 0) {
      const savedCountry =
        localStorage.getItem("selectedCountry") || countries[0]?.code || "CR";
      currentCountry = savedCountry;
    }

    return langData?.[currentCountry]?.[key] || key;
  },
}));

export default useLanguageStore;

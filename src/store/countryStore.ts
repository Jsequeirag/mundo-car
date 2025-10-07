import { create } from "zustand";
import { ICountry } from "@/interfaces/ICountry";

interface CountryState {
  countries: ICountry[];
  countryLoaded: boolean;
  loading: boolean;
  setCountries: (countries: ICountry[]) => void;
  getCountries: () => ICountry[];
  setLoading: (loading: boolean) => void;
}

const useCountryStore = create<CountryState>((set, get) => ({
  countries: [],
  countryLoaded: localStorage.getItem("countryLoaded") === "true",
  loading: false,
  setCountries: (countries: ICountry[]) => {
    set({ countries });
    localStorage.setItem("countryLoaded", "true");
    set({ countryLoaded: true });
    console.log("[CountryStore] Países cargados:", countries);
  },
  getCountries: () => get().countries,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useCountryStore;

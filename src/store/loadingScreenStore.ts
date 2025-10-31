import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  message: string;
  isCountryModalOpen: boolean; // 🟢 Estado del modal
  initialCheckDone: boolean; // 🟢 Validación inicial completada
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
  setCountryModalOpen: (open: boolean) => void; // 🟢 Abrir/cerrar modal
  setInitialCheckDone: (done: boolean) => void; // 🟢 Marcar validación hecha
}

const loadingStore = create<LoadingState>((set, get) => ({
  loading: false,
  message: "",
  isCountryModalOpen: false,
  initialCheckDone: false,

  setLoading: (loading: boolean) => set({ loading }),
  setMessage: (message: string) => set({ message }),

  // 🟢 Controlar apertura del modal
  setCountryModalOpen: (open: boolean) => set({ isCountryModalOpen: open }),

  // 🟢 Marcar cuando ya se validó localStorage (para no repetir el chequeo)
  setInitialCheckDone: (done: boolean) => set({ initialCheckDone: done }),
}));

export default loadingStore;

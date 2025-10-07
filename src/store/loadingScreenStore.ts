import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  message: string;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
}

const loadingStore = create<LoadingState>((set, get) => ({
  loading: false,
  message: "",
  setLoading: (loading: boolean) => set({ loading }),
  setMessage: (message: string) => set({ message }),
}));

export default loadingStore;

import { create } from "zustand";
import { IVehicle } from "@/interfaces/IVehicle";

interface VehicleState {
  vehicles: IVehicle[];
  setVehicles: (vehicles: IVehicle[]) => void;
  getVehicles: () => IVehicle[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  setVehicles: (vehicles: IVehicle[]) => set({ vehicles }),
  getVehicles: () => get().vehicles,
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useVehicleStore;

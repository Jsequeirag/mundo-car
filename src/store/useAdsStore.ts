import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

/* 🔹 Tipos base */
export type AdStatus = "draft" | "active" | "paid" | "expired";
export type MediaType = "image" | "video";
export type Placement = "hero" | "top" | "left" | "right" | "bottom";

export interface IAdPublication {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  mediaType: MediaType;
  placement: Placement;
  country: string;
  price: number;
  duration: number;
  status: AdStatus;
  inCart: boolean; // 👈 NUEVO CAMPO
  createdAt: string;
}

interface AdsStore {
  publications: IAdPublication[];
  loading: boolean;

  addPublication: (
    data: Omit<
      IAdPublication,
      "id" | "createdAt" | "status" | "price" | "inCart"
    >
  ) => void;
  editPublication: (id: string, updates: Partial<IAdPublication>) => void;
  deletePublication: (id: string) => void;
  toggleCart: (id: string) => void;
  markAsPaid: () => void;

  getTotal: () => number;
  getPublicationsTotal: () => number;
  getCartItems: () => IAdPublication[];

  calculatePrice: (placement: Placement, mediaType: MediaType) => number;

  saveToLocal: () => void;
  loadFromLocal: () => void;
  setLoading: (loading: boolean) => void;
}

const useAdsStore = create<AdsStore>((set, get) => ({
  publications: [],
  loading: false,

  calculatePrice: (placement, mediaType) => {
    const basePrices: Record<Placement, number> = {
      hero: 25,
      top: 15,
      left: 10,
      right: 10,
      bottom: 8,
    };
    const base = basePrices[placement] ?? 0;
    const mediaMultiplier = mediaType === "video" ? 1.5 : 1;
    return base * mediaMultiplier;
  },

  addPublication: (data) => {
    const price = get().calculatePrice(data.placement, data.mediaType);
    const newAd: IAdPublication = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: "draft",
      price,
      ...data,
    };
    const updated = [...get().publications, newAd];
    set({ publications: updated });
    localStorage.setItem("ads_publications", JSON.stringify(updated));
  },

  editPublication: (id, updates) => {
    const updated = get().publications.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    set({ publications: updated });
    localStorage.setItem("ads_publications", JSON.stringify(updated));
  },

  deletePublication: (id) => {
    const updated = get().publications.filter((p) => p.id !== id);
    set({ publications: updated });
    localStorage.setItem("ads_publications", JSON.stringify(updated));
  },

  toggleCart: (id) => {
    const updated = get().publications.map((p) =>
      p.id === id ? { ...p, inCart: !p.inCart } : p
    );
    set({ publications: updated });
    localStorage.setItem("ads_publications", JSON.stringify(updated));
  },

  markAsPaid: () => {
    const updated = get().publications.map((p) =>
      p.inCart ? { ...p, status: "paid", inCart: false } : p
    );
    set({ publications: updated });
    localStorage.setItem("ads_publications", JSON.stringify(updated));
  },

  getTotal: () =>
    get()
      .publications.filter((p) => p.inCart)
      .reduce((sum, ad) => sum + (ad.price || 0), 0),

  getPublicationsTotal: () =>
    get().publications.reduce((sum, ad) => sum + (ad.price || 0), 0),

  getCartItems: () => get().publications.filter((p) => p.inCart),

  saveToLocal: () => {
    localStorage.setItem(
      "ads_publications",
      JSON.stringify(get().publications)
    );
  },

  loadFromLocal: () => {
    const pubs = JSON.parse(localStorage.getItem("ads_publications") || "[]");
    set({ publications: Array.isArray(pubs) ? pubs : [] });
  },

  setLoading: (loading) => set({ loading }),
}));

export default useAdsStore;

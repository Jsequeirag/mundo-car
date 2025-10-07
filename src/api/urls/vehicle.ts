import { request } from "../config/network";
import { IVehicle } from "@/interfaces/IVehicle";
export const getVehiclesByFeatures = async (filters: {
  priceRange?: [number, number];
  yearRange?: [number, number];
  department?: string;
  brand?: string;
  model?: string;
  transmission?: string;
  condition?: string;
  featured?: boolean;
  fuel?: string;
}): Promise<IVehicle[]> => {
  return request({
    url: "/api/vehicle/GetVehiclesByFeatures",
    method: "POST",
    params:
      filters.brand === ""
        ? {
            priceMin: filters.priceRange?.[0],
            priceMax: filters.priceRange?.[1],
            yearMin: filters.yearRange?.[0],
            yearMax: filters.yearRange?.[1],
            department: filters.department,
            transmission: filters.transmission,
            condition: filters.condition,
            featured: filters.featured,
            fuel: filters.fuel,
          }
        : filters.model === "Cualquiera"
        ? {
            priceMin: filters.priceRange?.[0],
            priceMax: filters.priceRange?.[1],
            yearMin: filters.yearRange?.[0],
            yearMax: filters.yearRange?.[1],
            department: filters.department,
            brand: filters.brand,
            transmission: filters.transmission,
            condition: filters.condition,
            featured: filters.featured,
            fuel: filters.fuel,
          }
        : {
            priceMin: filters.priceRange?.[0],
            priceMax: filters.priceRange?.[1],
            yearMin: filters.yearRange?.[0],
            yearMax: filters.yearRange?.[1],
            department: filters.department,
            brand: filters.brand,
            model: filters.model,
            transmission: filters.transmission,
            condition: filters.condition,
            featured: filters.featured,
            fuel: filters.fuel,
          },
  });
};

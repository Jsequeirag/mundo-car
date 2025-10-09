import { request } from "../config/network";
import { IVehicle } from "@/interfaces/IVehicle";
interface VehicleDTO {
  id?: number;
  brand: string;
  model: string;
  fuel: string;
  locate: string;
  img: string;
  condition: string;
  featured: boolean;
  year: number;
  price: number;
  distance: number;
  transmission: string;
}
// Define the request body interface
interface RegisterVehicleRequest {
  vehicleDTO: VehicleDTO;
  images: string[]; // Array of base64 image strings
}

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
export const registerVehicle = async (
  vehicleData: RegisterVehicleRequest
): Promise<VehicleDTO> => {
  return request({
    url: "/api/vehicle/createVehicle",
    method: "POST",
    data: {
      vehicleDTO: {
        brand: vehicleData.vehicleDTO.brand,
        model: vehicleData.vehicleDTO.model,
        fuel: vehicleData.vehicleDTO.fuel,
        locate: vehicleData.vehicleDTO.locate,
        img: vehicleData.vehicleDTO.img,
        condition: vehicleData.vehicleDTO.condition,
        featured: vehicleData.vehicleDTO.featured,
        year: vehicleData.vehicleDTO.year,
        price: vehicleData.vehicleDTO.price,
        distance: vehicleData.vehicleDTO.distance,
        transmission: vehicleData.vehicleDTO.transmission,
      },
      images: vehicleData.images,
    },
  });
};

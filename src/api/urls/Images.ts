import { IImageVehicle } from "@/interfaces/ImageVehicle";
import { request } from "../config/network";
export const getImagesByVehicleId = async (
  vehicleId: number
): Promise<IImageVehicle[]> => {
  try {
    // Validate vehicleId
    if (!vehicleId || vehicleId <= 0) {
      throw new Error("Invalid vehicle ID. Please provide a positive integer.");
    }

    const url = `/api/imagesVehicle/getImagesByVehicleId/${vehicleId}`;
    const response = await request({
      url,
      method: "GET",
    });

    if (!Array.isArray(response)) {
      throw new Error("Invalid response format: expected an array of images");
    }

    return response as IImageVehicle[];
  } catch (error) {
    console.error(
      `Error fetching images at ${new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      })}:`,
      error
    );
    throw error; // Re-throw to allow calling code to handle it
  }
};

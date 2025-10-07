import { request } from "../config/network";
import { ICountry } from "@/interfaces/ICountry";

export const getCountries = async (enabled?: boolean): Promise<ICountry[]> => {
  return request({
    url: `/api/Country/getCountries/${enabled}`,
    method: "GET",
  });
};

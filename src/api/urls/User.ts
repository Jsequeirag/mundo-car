import { request } from "../config/network";
import { IUser } from "@/interfaces/IUser";

export const login = async (
  email: string,
  password: string
): Promise<IUser> => {
  return request({
    url: "/api/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: email,
      password: password,
    },
  });
};
export const register = async (user: IUser): Promise<IUser> => {
  return request({
    url: "/api/auth/register",
    method: "POST",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      workphone1: user.workphone1,
      workphone2: user.workphone2,
      mobilephone: user.mobilephone,
      country: user.country,
      role: user.role,
      password: user.password,
    },
  });
};

export const sendVerification = async (
  code: Number,
  email: string,
  fullname: String
): Promise<IUser> => {
  return request({
    url: "/api/auth/sendVerification",
    method: "POST",
    data: {
      code,
      email: email,
      fullname: fullname,
    },
  });
};
export const verifyExisted = async (user: IUser): Promise<IUser> => {
  return request({
    url: "/api/auth/verifyUserExisted",
    method: "POST",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      workphone1: user.workphone1,
      workphone2: user.workphone2,
      mobilephone: user.mobilephone,
      country: user.country,
      role: user.role,
      password: user.password,
    },
  });
};

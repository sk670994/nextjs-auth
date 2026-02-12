import axiosInstance from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "@/types/user";

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/api/auth/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterPayload) => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response.data;
};

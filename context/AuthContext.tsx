"use client";

import { createContext, useContext, useState } from "react";
import axiosInstance from "@/lib/axios";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

// ❗ IMPORTANT: use undefined, NOT null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    setUser(response.data.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await axiosInstance.post("/api/auth/register", {
        name,
        email,
        password,
      });
      return true;
    } catch (error: unknown) {
      let message = "Registration failed";

      if (axios.isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string })
          ?.message;
        if (serverMessage) {
          message = serverMessage;
        }
      }

      console.error("REGISTER ERROR:", error);
      alert(message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};




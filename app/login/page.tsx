"use client";

import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { loginSuccess } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      router.replace("/dashboard");
      // Hard redirect as a fallback to avoid any routing glitches
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (error: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(error)) {
        const serverMessage = (error.response?.data as { message?: string })
          ?.message;
        if (serverMessage) {
          message = serverMessage;
        }
      }

      alert(message);
      console.error("LOGIN ERROR:", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

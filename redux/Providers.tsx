"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { loginSuccess, logout } from "./authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    (async () => {
      try {
        const res = await axiosInstance.get("/api/profile");
        const user = res.data.user;
        store.dispatch(loginSuccess({ user, token }));
      } catch (err) {
        store.dispatch(logout());
      }
    })();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

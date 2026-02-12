"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  // Ensure we render nothing on the server and first client render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const hasToken =
      !!token ||
      (typeof window !== "undefined" && !!localStorage.getItem("token"));

    if (!hasToken) router.push("/login");
  }, [isMounted, router, token]);

  if (!isMounted) return null;

  const hasToken =
    !!token ||
    (typeof window !== "undefined" && !!localStorage.getItem("token"));

  return hasToken ? children : null;
}

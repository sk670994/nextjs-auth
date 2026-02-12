"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  // Rely only on browser storage so it works across refreshes
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  useEffect(() => {
    if (!hasToken) router.push("/login");
  }, [hasToken, router]);

  return hasToken ? children : null;
}

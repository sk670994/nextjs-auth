"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
      <Link href="/" className="text-lg font-semibold">
        Auth System
      </Link>

      <div className="flex items-center gap-4 text-sm">
        {!user && (
          <>
            <Link href="/login" className="hover:text-blue-300">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-300">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="hidden sm:inline text-gray-300">
              {user.name} ({user.role})
            </span>
            <Link href="/dashboard" className="hover:text-blue-300">
              Dashboard
            </Link>
            {user.role === "admin" && (
              <Link href="/admin" className="hover:text-blue-300">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-3 py-1 text-xs font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

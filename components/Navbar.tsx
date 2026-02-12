"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const auth = useAuth();

  if (!auth) return null; // prevent crash

  const { user, logout } = auth;

  return (
    <nav className="flex gap-6 p-4 bg-gray-900 text-white">
      <Link href="/">Home</Link>

      {!user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          {user.role === "admin" && <Link href="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {user && (
            <div className="space-y-1 rounded border bg-gray-50 p-4">
              <p className="font-semibold">Welcome, {user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs uppercase text-gray-500">
                Role: <span className="font-medium">{user.role}</span>
              </p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}

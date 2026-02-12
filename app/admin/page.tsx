"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
      </div>
    </ProtectedRoute>
  );
}

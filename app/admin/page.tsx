"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
          <p className="text-gray-600">
            Only users with the <span className="font-semibold">admin</span>{" "}
            role should see this page.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}

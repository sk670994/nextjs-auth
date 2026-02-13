"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Admin() {
  const router = useRouter();
  const current = useSelector((s: RootState) => s.auth.user);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (current && current.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [current, router]);

  useEffect(() => {
    if (!current) return;
    if (current.role !== "admin") return;

    setLoading(true);
    axiosInstance
      .get("/api/users")
      .then((res) => setUsers(res.data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [current]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const toggleRole = async (user: UserItem) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      const res = await axiosInstance.put(`/api/users/${user._id}`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u._id === user._id ? res.data : u)));
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>

          {loading && <p>Loading users...</p>}

          {!loading && (
            <div className="overflow-x-auto rounded border bg-white p-4">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Email</th>
                    <th className="px-2 py-2">Role</th>
                    <th className="px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t">
                      <td className="px-2 py-3">{u.name}</td>
                      <td className="px-2 py-3">{u.email}</td>
                      <td className="px-2 py-3">{u.role}</td>
                      <td className="px-2 py-3">
                        <button
                          onClick={() => toggleRole(u)}
                          className="mr-2 rounded bg-yellow-400 px-3 py-1 text-xs"
                        >
                          Toggle Role
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}

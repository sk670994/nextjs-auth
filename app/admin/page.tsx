"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Admin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get<AdminUser[]>("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (id: string, role: string) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  };

  const handleSave = async (user: AdminUser) => {
    setSavingId(user._id);
    try {
      await axiosInstance.put(`/api/users/${user._id}`, {
        name: user.name,
        email: user.email,
        role: user.role,
      });
      alert("User updated");
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to update user");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
          <p className="text-gray-600">
            Manage all registered users (only visible to admin role).
          </p>

          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto rounded border bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        <select
                          className="rounded border p-1 text-sm"
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <button
                          onClick={() => handleSave(user)}
                          disabled={savingId === user._id}
                          className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                          {savingId === user._id ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                          className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                          {deletingId === user._id ? "Deleting..." : "Delete"}
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

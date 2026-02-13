"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface UserItem {
=======

interface AdminUser {
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Admin() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
    }
  };

  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
<<<<<<< HEAD
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
=======
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
>>>>>>> 3b4f589b4563f8648c5c5a1c53241ef8e0ba12a2
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

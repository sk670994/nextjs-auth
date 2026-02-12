"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, loginSuccess } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/profile");
        const user = res.data.user as {
          _id: string;
          name: string;
          email: string;
          role: string;
        };

        const mapped: Profile = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        setProfile(mapped);
        setName(mapped.name);
        setEmail(mapped.email);

        // Keep Redux user in sync if needed
        if (authUser) {
          dispatch(
            loginSuccess({
              user: {
                id: mapped.id,
                name: mapped.name,
                email: mapped.email,
                role: mapped.role,
              },
              token: localStorage.getItem("token") || "",
            })
          );
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, [authUser, dispatch]);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const res = await axiosInstance.put("/api/profile", {
        name,
        email,
      });
      const updated = res.data.user as {
        _id: string;
        name: string;
        email: string;
        role: string;
      };
      const mapped: Profile = {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      };
      setProfile(mapped);
      // Sync Redux
      dispatch(
        loginSuccess({
          user: {
            id: mapped.id,
            name: mapped.name,
            email: mapped.email,
            role: mapped.role,
          },
          token: localStorage.getItem("token") || "",
        })
      );
      alert("Profile updated");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    setDeleting(true);
    try {
      await axiosInstance.delete("/api/profile");
      dispatch(logout());
      router.push("/register");
    } catch (error) {
      console.error("Failed to delete profile", error);
      alert("Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <main className="flex min-h-[calc(100vh-64px)] items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {profile && (
            <div className="space-y-1 rounded border bg-gray-50 p-4">
              <p className="font-semibold">Welcome, {profile.name}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
              <p className="text-xs uppercase text-gray-500">
                Role: <span className="font-medium">{profile.role}</span>
              </p>
            </div>
          )}

          <section className="space-y-3 rounded border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                className="w-full rounded border p-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded border p-2"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </section>

          <div className="flex items-center justify-between">
            <button
              onClick={handleLogout}
              className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete account"}
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

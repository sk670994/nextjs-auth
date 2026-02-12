"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/auth/login", { email, password });
    dispatch(loginSuccess(res.data));
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input className="w-full p-2 border rounded" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

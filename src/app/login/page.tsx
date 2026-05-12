"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } =
      await supabaseClient.auth.getSession();

    if (session) {
      router.push("/admin");
    }
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } =
        await supabaseClient.auth.signInWithPassword(
          {
            email,
            password,
          }
        );

        if (error) {

        alert(error.message);

        return;

        }

        const {
        data: { user },
        } =
        await supabaseClient.auth.getUser();

        if (
        user?.email !==
        "justtheroutes@gmail.com"
        ) {

        alert(
            "Unauthorized access"
        );

        await supabaseClient.auth.signOut();

        return;

        }

        document.cookie =
        `admin-email=${user.email}; path=/`;

        router.push("/admin");

        router.refresh();

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8F7F3] p-6">

      <div className="w-full max-w-md bg-white rounded-[2rem] p-10 luxury-shadow">

        <div className="mb-10">

          <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
            JustTheRoutes
          </p>

          <h1 className="text-4xl mb-4">
            Admin Login
          </h1>

          <p className="text-black/60">
            Secure access to the CRM dashboard.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[#1F3A32]"
            />
          </div>

          <div className="flex items-center justify-between text-sm">


          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </main>
  );
}
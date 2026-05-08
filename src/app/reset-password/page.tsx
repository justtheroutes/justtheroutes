"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReset = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } =
        await supabaseClient.auth.updateUser({
          password,
        });

      if (error) {
        alert(error.message);

        return;
      }

      alert(
        "Password updated successfully."
      );

      router.push("/login");
    } catch (error) {
      console.error(error);

      alert("Reset failed.");
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
            Reset Password
          </h1>

          <p className="text-black/60">
            Enter your new password below.
          </p>

        </div>

        <form
          onSubmit={handleReset}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 text-sm">
              New Password
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

      </div>

    </main>
  );
}
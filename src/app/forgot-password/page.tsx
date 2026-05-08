"use client";

import Link from "next/link";

import { useState } from "react";

import { supabaseClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
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
        await supabaseClient.auth.resetPasswordForEmail(
          email,
          {
            redirectTo:
              "http://localhost:3000/reset-password",
          }
        );

      if (error) {
        alert(error.message);

        return;
      }

      alert(
        "Password reset email sent."
      );
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
            Forgot Password
          </h1>

          <p className="text-black/60">
            Enter your email to receive a reset link.
          </p>

        </div>

        <form
          onSubmit={handleReset}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3A32] text-white rounded-full py-4 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-black/60">

          <Link
            href="/login"
            className="text-[#1F3A32]"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </main>
  );
}
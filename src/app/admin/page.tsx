"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";
import AdminNavbar from "@/components/dashboard/admin-navbar";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  destination: string;
  travelers: string;
  travel_date: string;
  message: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } =
      await supabaseClient.auth.getSession();

    console.log("SESSION:", session);

    if (!session) {
      router.push("/login");

      return;
    }

    fetchInquiries();
  };

  const fetchInquiries = async () => {
    const { data, error } =
      await supabaseClient
        .from("inquiries")
        .select("*");

    console.log("DATA:", data);

    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
    }

    setInquiries(data || []);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();

    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8F7F3]">
        <p className="text-lg text-black/60">
          Loading Dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F3] p-6 md:p-10">
        <AdminNavbar />

      <div className="max-w-7xl mx-auto pt-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-4">
              JustTheRoutes CRM
            </p>

            <h1 className="text-5xl text-[#222222] mb-4">
              Inquiry Dashboard
            </h1>

            <p className="text-[#222222]/70 text-lg">
              Manage incoming travel inquiries.
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-[#1F3A32] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Logout
          </button>

        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 text-center luxury-shadow">

            <h2 className="text-2xl mb-4">
              No inquiries found
            </h2>

            <p className="text-black/60">
              No rows are currently being returned from Supabase.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {inquiries.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[2rem] p-8 luxury-shadow border border-black/5"
              >

                <div className="space-y-5">

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Traveler
                    </p>

                    <h2 className="text-2xl">
                      {item.name}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Phone
                    </p>

                    <p className="text-lg">
                      {item.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Destination
                    </p>

                    <p className="text-lg">
                      {item.destination}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Travelers
                    </p>

                    <p className="text-lg">
                      {item.travelers}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Travel Date
                    </p>

                    <p className="text-lg">
                      {item.travel_date}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/50 mb-1">
                      Preferences
                    </p>

                    <p className="text-black/70 leading-relaxed">
                      {item.message || "No message"}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}
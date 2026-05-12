"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import AdminNavbar from "@/components/dashboard/admin-navbar";

import { supabaseClient } from "@/lib/supabase-client";

import Link from "next/link";

type Inquiry = {
  id: string;

  inquiry_number: string;

  name: string;

  whatsapp: string;

  travel_month: string;

  travellers: string;

  trip_type: string;

  notes: string;

  status: string;

  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } =
      await supabaseClient.auth.getSession();

    if (!session) {
      router.push("/login");

      return;
    }

    fetchInquiries();
  };

const fetchInquiries =
  async () => {

    try {

      const {
        data,
        error,
      } =
        await supabaseClient
          .from("inquiries")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) {

        console.error(error);

        alert(error.message);

        return;

      }

      setInquiries(
        data || []
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load dashboard."
      );

    } finally {

      setLoading(false);

    }

};

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {
      await supabaseClient
        .from("inquiries")
        .update({
          status,
        })
        .eq("id", id);

      fetchInquiries();
    };



  const filteredInquiries =
    filter === "All"
      ? inquiries
      : inquiries.filter(
          (item) =>
            item.status === filter
        );

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
    <main className="min-h-screen bg-[#F8F7F3] p-4 md:p-8">

      <AdminNavbar />

      <div className="max-w-[1600px] mx-auto pt-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-sm text-[#1F3A32]/70 mb-3">
              JustTheRoutes CRM
            </p>

            <h1 className="text-4xl md:text-5xl text-[#222222] mb-3">
              Inquiry Dashboard
            </h1>

            <p className="text-[#222222]/70">
              Manage and track incoming travel leads.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-3 max-w-[700px] justify-start lg:justify-end">

            {[
            "All",
            "New",
            "Attempted",
            "Contacted",
            "Planning",
            "Negotiating",
            "Confirmed",
            "Dropped",
            "Dead",
            "Closed",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setFilter(status)
                }
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition border ${
                filter === status
                    ? "bg-[#1F3A32] text-white border-[#1F3A32]"
                    : "bg-white text-[#222222]/70 border-black/10 hover:border-[#1F3A32]/30"
                }`}
              >
                {status}
              </button>
            ))}


          </div>

        </div>

        <div className="overflow-x-auto bg-white rounded-[2rem] border border-black/5">

          <table className="w-full min-w-[1200px]">

            <thead className="border-b border-black/5 bg-[#F8F7F3]">

              <tr className="text-left">

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Inquiry ID
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Traveler
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  WhatsApp
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Month
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Travellers
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Trip Type
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Notes
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Status
                </th>

                <th className="px-6 py-5 text-sm font-medium text-black/50">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredInquiries.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="border-b border-black/5 hover:bg-[#F8F7F3]/60 transition"
                  >

                    <td className="px-6 py-5 font-medium text-[#1F3A32] whitespace-nowrap">
                      {item.inquiry_number}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                    <Link
                        href={`/admin/inquiries/${item.id}`}
                        className="text-[#1F3A32] hover:underline font-medium"
                    >
                        {item.name}
                    </Link>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      {item.whatsapp}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      {item.travel_month}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      {item.travellers}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      {item.trip_type}
                    </td>

                    <td className="px-6 py-5 max-w-[300px] text-black/70">
                      {item.notes ||
                        "—"}
                    </td>

                    <td className="px-6 py-5">

                      <select
                        value={
                          item.status
                        }
                        onChange={(
                          e
                        ) =>
                          updateStatus(
                            item.id,
                            e.target
                              .value
                          )
                        }
                        className="border border-black/10 rounded-full px-4 py-2 bg-white"
                      >

                        <option>
                          New
                        </option>

                        <option>
                          Attempted
                        </option>
                        
                        <option>
                          Contacted
                        </option>

                        <option>
                          Planning
                        </option>

                        <option>
                          Negotiating
                        </option>
                        
                        <option>
                          Confirmed
                        </option>

                        <option>
                          Dropped
                        </option>
                        
                        <option>
                          Dead
                        </option>

                        <option>
                          Closed
                        </option>

                      </select>

                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-black/60">

                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}
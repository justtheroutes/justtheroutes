import { supabaseClient } from "@/lib/supabase-client";

export async function getAllItineraries() {
  const { data, error } =
    await supabaseClient
      .from("itineraries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function getItineraryById(
  id: string
) {
  const { data, error } =
    await supabaseClient
      .from("itineraries")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
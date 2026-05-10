import { supabaseClient } from "@/lib/supabase-client";

export async function getAllStays() {
  const { data, error } =
    await supabaseClient
      .from("stays")
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

export async function getStayBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("stays")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
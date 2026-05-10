import { supabaseClient } from "@/lib/supabase-client";

export async function getAllCabs() {
  const { data, error } =
    await supabaseClient
      .from("cabs")
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

export async function getCabBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("cabs")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
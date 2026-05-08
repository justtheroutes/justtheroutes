import { supabaseClient } from "@/lib/supabase-client";

export async function getFeaturedDestinations() {
  const { data, error } =
    await supabaseClient
      .from("destinations")
      .select("*")
      .eq("featured", true)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function getAllDestinations() {
  const { data, error } =
    await supabaseClient
      .from("destinations")
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

export async function getDestinationBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("destinations")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
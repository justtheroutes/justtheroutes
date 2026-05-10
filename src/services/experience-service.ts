import { supabaseClient } from "@/lib/supabase-client";

export async function getAllExperiences() {
  const { data, error } =
    await supabaseClient
      .from("experiences")
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

export async function getFeaturedExperiences() {
  const { data, error } =
    await supabaseClient
      .from("experiences")
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

export async function getExperienceBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("experiences")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
import { supabaseClient } from "@/lib/supabase-client";

export async function getAllProducts() {
  const { data, error } =
    await supabaseClient
      .from("heritage_products")
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

export async function getProductBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("heritage_products")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}
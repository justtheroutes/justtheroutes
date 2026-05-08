import { supabaseClient } from "@/lib/supabase-client";

export async function getPublishedBlogs() {
  const { data, error } =
    await supabaseClient
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function getBlogBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}

export async function getAllBlogs() {
  const { data, error } =
    await supabaseClient
      .from("blogs")
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
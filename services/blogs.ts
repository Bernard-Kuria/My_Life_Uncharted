import { Blog, BlogMetaParams } from "@lib/types/types";
import { API_BASE } from "@utils/constants";

export async function getAllBlogs(filters?: { topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(`/api/blogs?${params.toString()}`, {
    cache: "no-store",
  });

  // if (!res.ok) {
  //   const message = await res.text(); // or res.json()
  //   return message;
  // }
  return res.json();
}

export async function getBlogMetaById(id: string) {
  try {
    const res = await fetch(`/api/blogs?id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok)
      throw new Error(
        `Failed to fetch blog meta for provided id: ${res.status}`
      );
    const data = await res.json();
    return { type: "blogs", id: data.id, blogMeta: data.blogMeta };
  } catch (err) {
    console.error("Error in getAllBlogsMetaById:", err);
    throw err;
  }
}

export async function addBlogMeta(data: Blog) {
  try {
    const res = await fetch(`/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add blog meta`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding blog meta:", err);
    throw err;
  }
}

export async function updateBlogMeta({
  id,
  blogMeta,
}: {
  id: string;
  blogMeta: BlogMetaParams;
}) {
  try {
    const res = await fetch(`/api/blogs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, blogMeta }),
    });

    if (!res.ok) throw new Error("Failed to update blog meta");
    return await res.json();
  } catch (err) {
    console.error("Error in blog meta update:", err);
    throw err;
  }
}

export async function deleteBlogMeta(id: string) {
  try {
    const res = await fetch(`/api/blogs`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error(`Failed to delete blog meta`);
    return await res.json();
  } catch (err) {
    console.error("Error in blog meta delete:", err);
    throw err;
  }
}

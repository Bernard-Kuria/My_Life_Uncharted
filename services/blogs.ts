import { Blog, blogMetaParams } from "@lib/types";
import { API_BASE } from "@utils/constants";

export async function getAllBlogs(filters?: { id?: string; topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.id) params.append("id", filters.id);
  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(`${API_BASE}/api/blogs?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blogs meta");
  return res.json();
}

export async function getBlogMetaById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs meta: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogMeta: data.blogMeta };
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

export async function addDraftMeta(data: Blog) {
  try {
    const res = await fetch(`/api/blogs/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add blog content`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding blog content:", err);
    throw err;
  }
}

export async function updateBlogMeta({
  id,
  blogMeta,
}: {
  id: string;
  blogMeta: blogMetaParams;
}) {
  try {
    const res = await fetch(`/api/blogs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, blogMeta }), // 👈 no extra data wrapper
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

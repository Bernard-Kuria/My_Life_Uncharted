import { content } from "@lib/types";
import { API_BASE } from "@utils/constants";

export async function getAllBlogs(filters?: { id?: string; topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.id) params.append("id", filters.id);
  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(`${API_BASE}/api/blogs?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlogMetaById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogMeta: data.blogMeta };
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}

export async function addBlogMeta(data: content) {
  return;
}

export async function updateBlogMeta(data: {
  id: number;
  blogContent: content;
}) {
  try {
    const res = await fetch(`/api/blogs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) throw new Error(`Failed to update blog`);
    return await res.json();
  } catch (err) {
    console.error("Error in blog update:", err);
    throw err;
  }
}

export async function deleteBlogMeta(data: content) {
  return;
}

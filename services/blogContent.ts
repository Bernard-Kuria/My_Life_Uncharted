import { content } from "@lib/types";
import { API_BASE } from "@utils/constants";

export async function getAllBlogsContent() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/all`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}

export async function getBlogContentById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const data = await res.json();
    return { id: data.id, blogContent: data.blogContent };
  } catch (err) {
    console.error("Error in getAllBlogsContent:", err);
    throw err;
  }
}

export async function addBlogContent(data: {
  id: string;
  blogContent: content;
}) {
  try {
    const res = await fetch(`/api/blogs/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add blog`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding blog:", err);
    throw err;
  }
}

export async function addDraft(data: { id: string; blogContent: content }) {
  try {
    const res = await fetch(`/api/blogs/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add blog`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding blog:", err);
    throw err;
  }
}

export async function updateBlogContent(data: {
  id: string;
  blogContent: content;
}) {
  try {
    const res = await fetch(`/api/blogs/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to update blog`);
    return await res.json();
  } catch (err) {
    console.error("Error in blog update:", err);
    throw err;
  }
}

export async function deleteBlogContent(id: string) {
  try {
    const res = await fetch(`/api/blogs/deleteContent`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error(`Failed to update blog content`);
    return await res.json();
  } catch (err) {
    console.error("Error in blog content delete:", err);
    throw err;
  }
}

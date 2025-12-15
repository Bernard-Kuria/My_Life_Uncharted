import { Comment } from "@lib/types/types";

export async function getAllComments() {
  try {
    const res = await fetch(`/api/comments`, {
      cache: "no-store",
    });
    if (!res.ok)
      throw new Error(`Failed to fetch featured blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllFeaturedBlogs:", err);
    throw err;
  }
}

export const getSpecificBlogComments = async (id: string) => {
  try {
    const res = await fetch(`/api/comments/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch comments: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error in getSpecificBlogComments:", err);
    throw err;
  }
};

export const getSpecificBlog = async (blog: string, id: string) => {
  try {
    const res = await fetch(`/api/comments/${blog}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog comments: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error in getSpecificBlog:", err);
    throw err;
  }
};

export async function addComment(data: Comment) {
  try {
    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add comment`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding comment:", err);
    throw err;
  }
}

export async function updateComment(data: {
  docId: string;
  comment?: string;
  likes?: number;
}) {
  try {
    const res = await fetch(`/api/comments`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update comment");
    return await res.json();
  } catch (err) {
    console.error("Error in comment update:", err);
    throw err;
  }
}

export async function deleteComments(id: string) {
  try {
    const res = await fetch(`/api/comments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error(`Failed to delete comment`);
    return await res.json();
  } catch (err) {
    console.error("Error in comment delete:", err);
    throw err;
  }
}

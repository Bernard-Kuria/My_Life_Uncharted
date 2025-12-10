import { getCurrentDateFormatted } from "@lib/utils";
import { API_BASE } from "@utils/constants";

export async function getAllTopics() {
  try {
    const res = await fetch(`/api/blogTopics`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch topics: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllTopics:", err);
    throw err;
  }
}

export async function addTopic(title: string) {
  try {
    const res = await fetch(`/api/blogTopics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        image: "",
        timeStamp: "Last Updated " + getCurrentDateFormatted(),
      }),
    });

    if (!res.ok) throw new Error("Failed to add blog topic");
    return await res.json();
  } catch (err) {
    console.error("Error in blog topic add:", err);
    throw err;
  }
}

export async function updateTopic(data: {
  id: string;
  image?: string;
  title?: string;
}) {
  try {
    const res = await fetch(`/api/blogTopics`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update blog topic");
    return await res.json();
  } catch (err) {
    console.error("Error in blog topic update:", err);
    throw err;
  }
}

export async function deleteTopic(id: string) {
  try {
    const res = await fetch(`/api/blogTopics`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error("Failed to delete blog topic");
    return await res.json();
  } catch (err) {
    console.error("Error in blog topic delete:", err);
    throw err;
  }
}

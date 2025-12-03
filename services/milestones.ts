import { Milestones } from "@lib/types/types";
import { API_BASE } from "@utils/constants";

export async function getAllMilestones(topic?: string) {
  try {
    const res = await fetch(
      `${API_BASE}/api/milestones?topic=${
        topic ? encodeURIComponent(topic) : ""
      }`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok)
      throw new Error(`Failed to fetch featured blogs: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getAllFeaturedBlogs:", err);
    throw err;
  }
}

export async function updateMilestone(data: Milestones) {
  try {
    const res = await fetch(`${API_BASE}/api/milestones`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update milestones");
    return await res.json();
  } catch (err) {
    console.error("Error in milestone update:", err);
    throw err;
  }
}

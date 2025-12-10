import { Milestone, Milestones } from "@lib/types/types";

export async function getAllMilestones(topic?: string) {
  try {
    const res = await fetch(
      `/api/milestones?topic=${topic ? encodeURIComponent(topic) : ""}`,
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

export async function addMilestones(data: {
  topic: string;
  milestones: Milestone[];
}) {
  try {
    const res = await fetch(`/api/milestones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to add milestone");
    return await res.json();
  } catch (err) {
    console.error("Error in milestone add:", err);
    throw err;
  }
}

export async function updateMilestone(data: Milestones) {
  try {
    const res = await fetch(`/api/milestones`, {
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

export async function deleteMilestones(topic: string) {
  try {
    const res = await fetch(`/api/milestones`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(topic),
    });

    if (!res.ok) throw new Error("Failed to delete milestones");
    return await res.json();
  } catch (err) {
    console.error("Error in milestones delete:", err);
    throw err;
  }
}

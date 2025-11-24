import { Draft, DraftMetaParams } from "@lib/types/types";
import { API_BASE } from "@utils/constants";

export async function getAllDrafts(filters?: { id?: string; topic?: string }) {
  const params = new URLSearchParams();

  if (filters?.id) params.append("id", filters.id);
  if (filters?.topic) params.append("topic", filters.topic);

  const res = await fetch(`${API_BASE}/api/drafts?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch drafts");
  return res.json();
}

export async function getDraftMetaById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/drafts?id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch drafts: ${res.status}`);
    const data = await res.json();
    return { type: "draft", id: data.id, draftMeta: data.draftMeta };
  } catch (err) {
    console.error("Error in getAllDraftsContent:", err);
    throw err;
  }
}

export async function addDraftMeta(data: Draft) {
  try {
    const res = await fetch(`/api/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add draft meta`);
    return await res.json();
  } catch (err) {
    console.error("Error in adding draft meta:", err);
    throw err;
  }
}

export async function updateDraftMeta({
  id,
  draftMeta,
}: {
  id: string;
  draftMeta: DraftMetaParams;
}) {
  try {
    const res = await fetch(`/api/drafts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, draftMeta }),
    });

    if (!res.ok) throw new Error("Failed to update draft meta");
    return await res.json();
  } catch (err) {
    console.error("Error in draft meta update:", err);
    throw err;
  }
}

export async function deleteDraftMeta(id: string) {
  try {
    const res = await fetch(`/api/drafts`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error(`Failed to delete draft meta`);
    return await res.json();
  } catch (err) {
    console.error("Error in draft meta delete:", err);
    throw err;
  }
}

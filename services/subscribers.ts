import { API_BASE } from "@utils/constants";

import { Subscriber } from "@lib/types/types";

export async function getSubscribers() {
  try {
    const res = await fetch(`/api/subscribers`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch subscribers: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getSubscribers:", err);
    throw err;
  }
}

export async function addSubscriber(data: { email: string; topics: string[] }) {
  try {
    const res = await fetch(`/api/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add subscriber`);
    return await res.json();
  } catch (err) {
    console.error("Error in addSubscriber:", err);
    throw err;
  }
}

export async function updateSubscriber(data: Subscriber) {
  try {
    const res = await fetch(`/api/subscribers`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update subscriber");
    return await res.json();
  } catch (err) {
    console.error("Error in updatSubscriber:", err);
    throw err;
  }
}

export async function deleteSubscriber(email: string) {
  try {
    const res = await fetch(`/api/subscribers`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });

    if (!res.ok) throw new Error(`No email found`);
    return await res.json();
  } catch (err) {
    throw "Error disconnecting; either email doesn't exist or network problems.";
  }
}

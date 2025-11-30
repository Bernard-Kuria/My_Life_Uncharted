import { API_BASE } from "@utils/constants";

import { Subscription } from "@lib/types/types";

export async function getSubscriptions() {
  try {
    const res = await fetch(`${API_BASE}/api/subscriptions`, {
      cache: "no-store",
    });
    if (!res.ok)
      throw new Error(`Failed to fetch subscriptions: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getSubscriptions:", err);
    throw err;
  }
}

export async function addSubscription(data: {
  email: string;
  topics: string[];
}) {
  try {
    const res = await fetch(`${API_BASE}/api/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to add subscription`);
    return await res.json();
  } catch (err) {
    console.error("Error in addSubscription:", err);
    throw err;
  }
}

export async function updateSubscription(data: Subscription) {
  try {
    const res = await fetch(`${API_BASE}/api/subscriptions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update subscription");
    return await res.json();
  } catch (err) {
    console.error("Error in updateSubscription:", err);
    throw err;
  }
}

export async function deleteSubscription(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/subscriptions`, {
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

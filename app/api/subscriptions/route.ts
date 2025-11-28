import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  where,
  query,
} from "firebase/firestore";

// GET: fetch all subscriptions
export async function GET(req: Request) {
  try {
    const subscriptionsSnapshot = await getDocs(
      collection(db, "subscriptions")
    );

    return NextResponse.json(
      subscriptionsSnapshot.docs.map((topic) => {
        return { id: topic.id, ...topic.data() };
      })
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return new Response("Failed to fetch subscriptions", { status: 500 });
  }
}

// POST: create new subscription
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Reference the collection. `addDoc` will create a new document within it.
    const subscriptionsCollection = collection(db, "subscriptions");

    // Save subscription
    const docRef = await addDoc(subscriptionsCollection, data);

    return NextResponse.json({
      id: docRef.id,
      message: "subscription created!",
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return new Response("Failed to create subscription", { status: 500 });
  }
}

// PUT: update subscription by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...subscriptionData } = data;

    if (!id) return new Response("Missing subscription ID", { status: 400 });

    const topicRef = doc(db, "subscriptions", id);

    await updateDoc(topicRef, { id: id, ...subscriptionData });

    return NextResponse.json({ id, message: "Subscription updated!" });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return new Response("Failed to update subscription", { status: 500 });
  }
}

// DELETE: delete subscription by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { email } = data;

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    // Reference the subscriptions collection
    const subscriptionsRef = collection(db, "subscriptions");

    // Query for documents with matching email
    const q = query(subscriptionsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new Response("No subscription found for this email", {
        status: 404,
      });
    }

    // Delete all matching subscriptions (usually only one)
    const deletedIds: string[] = [];
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, "subscriptions", docSnap.id));
      deletedIds.push(docSnap.id);
    }

    return NextResponse.json({
      message: "Subscription deleted!",
      deletedIds,
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return new Response("Failed to delete subscription", { status: 500 });
  }
}

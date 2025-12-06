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

// GET: fetch all subscribers
export async function GET() {
  try {
    const subscribersSnapshot = await getDocs(collection(db, "subscribers"));

    return NextResponse.json(
      subscribersSnapshot.docs.map((topic) => {
        return { id: topic.id, ...topic.data() };
      })
    );
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return new Response("Failed to fetch subscribers", { status: 500 });
  }
}

// POST: create new subscriber
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const subscribersCollection = collection(db, "subscribers");

    // Save subscriber
    const docRef = await addDoc(subscribersCollection, data);

    return NextResponse.json({
      id: docRef.id,
      message: "subscriber created!",
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return new Response("Failed to create subscriber", { status: 500 });
  }
}

// PUT: update subscriber by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...subscriptionData } = data;

    if (!id) return new Response("Missing subscriber ID", { status: 400 });

    const topicRef = doc(db, "subscribers", id);

    await updateDoc(topicRef, { id: id, ...subscriptionData });

    return NextResponse.json({ id, message: "subscriber updated!" });
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return new Response("Failed to update subscriber", { status: 500 });
  }
}

// DELETE: delete subscriber by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const email = data;

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    const subscriptionsRef = collection(db, "subscribers");

    const q = query(subscriptionsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new Response("No subscriber found for this email", {
        status: 404,
      });
    }

    const deletedIds: string[] = [];
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, "subscribers", docSnap.id));
      deletedIds.push(docSnap.id);
    }

    return NextResponse.json({
      message: "subscriber deleted!",
      deletedIds,
    });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return new Response("Failed to delete subscriber", { status: 500 });
  }
}

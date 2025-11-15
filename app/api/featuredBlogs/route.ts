import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

// GET: fetch all featured blogs or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    const featuredBlogCollection = collection(db, "featuredBlogs");

    // Fetch by internal id stored in the document
    if (id) {
      const q = query(featuredBlogCollection, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return NextResponse.json({
          id: "",
          topic: "",
        });
      }

      // If multiple documents somehow have the same id, just return the first one
      const featuredBlog = querySnapshot.docs[0].data();
      return NextResponse.json(featuredBlog);
    }

    // Fetch by topic
    if (topic) {
      const q = query(featuredBlogCollection, where("topic", "==", topic));
      const querySnapshot = await getDocs(q);

      const featuredBlogs = querySnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(featuredBlogs);
    }

    // Fetch all featured blogs
    const snapshot = await getDocs(featuredBlogCollection);
    const allBlogs = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return new Response("Failed to fetch featured blogs", { status: 500 });
  }
}

// POST: create new blog
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, topic } = data;

    // Call the reusable service function
    await setDoc(doc(db, "featuredBlogs", id), {
      topic: topic,
      id: id,
    });

    return NextResponse.json({ id: id, message: "Blog created!" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response("Failed to create blog", { status: 500 });
  }
}

// PUT: update the featured blog for a given topic
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, topic } = data;

    if (!id || !topic)
      return new Response("Missing required fields", { status: 400 });

    // Query the featuredBlogs collection for the given topic
    const featuredRef = collection(db, "featuredBlogs");
    const q = query(featuredRef, where("topic", "==", topic));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the topic already exists, update that document
      const docRef = querySnapshot.docs[0].ref;
      await setDoc(docRef, { id, topic }, { merge: true });

      return NextResponse.json({
        id,
        topic,
        message: "Featured blog updated for this topic!",
      });
    } else {
      // If no document exists for that topic, create a new one
      const newDocRef = doc(collection(db, "featuredBlogs"));
      await setDoc(newDocRef, { id, topic });

      return NextResponse.json({
        id,
        topic,
        message: "New featured blog created for this topic!",
      });
    }
  } catch (error) {
    console.error("Error updating/creating featured blog:", error);
    return new Response("Failed to update or create featured blog", {
      status: 500,
    });
  }
}

// DELETE: delete blog by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing blog ID", { status: 400 });

    await deleteDoc(doc(db, "featuredBlogs", id));

    return NextResponse.json({ id, message: "Featured Blog deleted!" });
  } catch (error) {
    console.error("Error deleting  featured blog:", error);
    return new Response("Failed to delete  featured blog", { status: 500 });
  }
}

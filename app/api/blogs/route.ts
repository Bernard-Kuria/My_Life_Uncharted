import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { BlogMetaParams } from "@lib/types/types";

// GET: fetch all blogs or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    if (id) {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);

      if (!blogSnap.exists())
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );

      return NextResponse.json(blogSnap.data());
    }

    if (topic) {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, where("blogMeta.topic", "==", topic));
      const querySnapshot = await getDocs(q);

      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // if (blogs.length === 0)
      //   return NextResponse.json([], {
      //     status: 404,
      //   });

      return NextResponse.json(blogs);
    }

    const blogSnapshot = await getDocs(collection(db, "blogs"));
    return NextResponse.json(blogSnapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST: create new blog
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    // Save blog metadata
    await setDoc(doc(db, "blogs", id), data);

    return NextResponse.json({ id: id, message: "Blog created!" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json("Failed to create blog", { status: 500 });
  }
}

// PUT: update blog by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, blogMeta } = data as { id: string; blogMeta: BlogMetaParams };

    if (!id) return NextResponse.json("Missing blog ID", { status: 400 });

    // Build dynamic update object
    const updates: Partial<
      Record<
        `blogMeta.${keyof BlogMetaParams}`,
        string | string[] | number | undefined
      >
    > = {};

    for (const [key, value] of Object.entries(blogMeta)) {
      if (value !== undefined) {
        updates[`blogMeta.${key}` as `blogMeta.${keyof BlogMetaParams}`] =
          value;
      }
    }

    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, updates);

    return NextResponse.json({ id, message: "Blog updated!" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json("Failed to update blog", { status: 500 });
  }
}

// DELETE: delete blog by ID
export async function DELETE(req: Request) {
  try {
    const id = await req.json();

    if (!id) return NextResponse.json("Missing blog ID", { status: 400 });

    await deleteDoc(doc(db, "blogs", id));

    return NextResponse.json({ id, message: "Blog deleted!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json("Failed to delete blog", { status: 500 });
  }
}

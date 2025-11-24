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
import { DraftMetaParams } from "@lib/types/types";

// GET: fetch all drafts or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific draft
      const draftRef = doc(db, "drafts", id);
      const draftSnap = await getDoc(draftRef);

      if (!draftSnap.exists())
        return NextResponse.json(
          { message: "Draft not found" },
          { status: 404 }
        );

      return NextResponse.json(draftSnap.data());
    } else if (topic) {
      // Fetch drafts corresponding to particular topic
      const blogRef = collection(db, "drafts");
      const q = query(blogRef, where("draftMeta.topic", "==", topic));

      const querySnapshot = await getDocs(q);

      const drafts = querySnapshot.docs.map((doc) => doc.data());

      // if (drafts.length === 0)
      //   return NextResponse.json([], {
      //     status: 404,
      //   });

      return NextResponse.json(drafts);
    } else {
      // Fetch all drafts
      const draftSnapshot = await getDocs(collection(db, "drafts"));

      return NextResponse.json(draftSnapshot.docs.map((doc) => doc.data()));
    }
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return NextResponse.json(
      { message: "Failed to fetch drafts" },
      { status: 500 }
    );
  }
}

// POST: create new draft
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    // Save draft metadata
    await setDoc(doc(db, "drafts", id), data);

    return NextResponse.json({ id: id, message: "Draft created!" });
  } catch (error) {
    console.error("Error creating draft:", error);
    return NextResponse.json(
      { message: "Failed to create draft" },
      { status: 500 }
    );
  }
}

// PUT: update draft by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, draftMeta } = data as {
      id: string;
      draftMeta: DraftMetaParams;
    };

    if (!id)
      return NextResponse.json(
        { message: "Missing draft ID" },
        { status: 400 }
      );

    // Build dynamic update object
    const updates: Partial<
      Record<
        `draftMeta.${keyof DraftMetaParams}`,
        string | string[] | number | undefined
      >
    > = {};

    for (const [key, value] of Object.entries(draftMeta)) {
      if (value !== undefined) {
        updates[`draftMeta.${key}` as `draftMeta.${keyof DraftMetaParams}`] =
          value;
      }
    }

    const draftRef = doc(db, "drafts", id);
    await updateDoc(draftRef, updates);

    return NextResponse.json({ id, message: "Draft updated!" });
  } catch (error) {
    console.error("Error updating draft:", error);
    return NextResponse.json(
      { message: "Failed to update draft" },
      { status: 500 }
    );
  }
}

// DELETE: delete draft by ID
export async function DELETE(req: Request) {
  try {
    const id = await req.json();

    if (!id)
      return NextResponse.json(
        { message: "Missing draft ID" },
        { status: 400 }
      );

    await deleteDoc(doc(db, "drafts", id));

    return NextResponse.json({ id, message: "Draft deleted!" });
  } catch (error) {
    console.error("Error deleting draft:", error);
    return NextResponse.json(
      { message: "Failed to delete draft" },
      { status: 500 }
    );
  }
}

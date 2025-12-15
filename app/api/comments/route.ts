import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDoc,
  where,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

// GET: fetch all comments or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const matchId = url.searchParams.get("matchId");

    // Case 1: Fetch comments with specific internal ID
    if (matchId) {
      const commentsRef = collection(db, "comments");

      const q = query(
        commentsRef,
        where("id", "==", matchId),
        orderBy("createdAt", "asc") // <---- ADDED ORDERING
      );

      const querySnapshot = await getDocs(q);

      const comments = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));

      if (comments.length === 0) {
        return new Response("No comments found for this ID", { status: 404 });
      }

      return NextResponse.json(comments);
    }

    // Case 2: Fetch specific comment document
    if (id) {
      const commentRef = doc(db, "comments", id);
      const commentSnap = await getDoc(commentRef);

      if (!commentSnap.exists()) {
        return new Response("Comment not found", { status: 404 });
      }

      return NextResponse.json(commentSnap.data());
    }

    // Case 3: Fetch all comments
    const q = query(
      collection(db, "comments"),
      orderBy("createdAt", "asc") // <---- ADDED ORDERING
    );

    const snapshot = await getDocs(q);

    const comments = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}

// POST: create new comment
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, comment, likes } = data;

    // Reference the collection. `addDoc` will create a new document within it.
    const commentCollection = collection(db, "comments");

    // Save comment metadata
    const docRef = await addDoc(commentCollection, {
      internalId: id,
      comment: comment,
      likes: likes,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id, message: "comment created!" });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Failed to create comment", { status: 500 });
  }
}

// PUT: update comment by ID (Not working).
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { docId, ...commentdata } = data;

    if (!docId) return new Response("Missing comment ID", { status: 400 });

    const commentRef = doc(db, "comments", docId);

    await updateDoc(commentRef, commentdata, { merge: true });

    return NextResponse.json({ docId, message: "comment updated!" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response("Failed to update comment", { status: 500 });
  }
}

// DELETE: delete comment by ID
export async function DELETE(req: Request) {
  // We assume req.json() succeeds and the body contains { internalId: string }
  const internalId = await req.json();

  try {
    // 1. Query the collection to find all documents matching the internalId field
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("internalId", "==", internalId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no document matches the internalId, return a success message
      // since there is nothing to delete.
      return NextResponse.json({
        internalId,
        message:
          "No comments found matching the internalId. No documents deleted.",
      });
    }

    const deletePromises: Promise<void>[] = [];
    let deletedCount = 0;

    // 2. Iterate over all found documents and schedule deletion
    querySnapshot.forEach((documentSnapshot) => {
      // Get the actual document reference using its Firebase Document ID
      const docRef = doc(db, "comments", documentSnapshot.id);

      // Push the delete operation promise into an array
      deletePromises.push(deleteDoc(docRef));
      deletedCount++;
    });

    // 3. Wait for all delete operations to complete concurrently
    await Promise.all(deletePromises);

    // 4. Return success response
    return NextResponse.json({
      internalId,
      count: deletedCount,
      message: `Successfully deleted ${deletedCount} comment(s) matching internalId.`,
    });
  } catch (error) {
    console.error("Error during batch comment deletion:", error);
    // Return a generic server error message
    return new Response("Failed to delete comments due to an internal error", {
      status: 500,
    });
  }
}

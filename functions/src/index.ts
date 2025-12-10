import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sharp from "sharp";
import { tmpdir } from "os";
import { join, basename } from "path";
import { promises as fs } from "fs";

import { BlogType, ContactType } from "../utils/types";
import { onObjectFinalized, StorageEvent } from "firebase-functions/storage";

admin.initializeApp();

const EMAIL_COLLECTION = "email";
// const BASE_URL = "https://my-life-uncharted.web.app";

admin.initializeApp();

// Cloud Function: triggers whenever a new object is finalized (uploaded) in storage
export const compressImages = onObjectFinalized(async (event: StorageEvent) => {
  // Extract actual metadata about the uploaded file
  const object = event.data;
  if (!object) return null; // Safety check: exit if no metadata

  const filePath = object.name; // full path of uploaded file in the bucket
  const contentType = object.contentType || ""; // MIME type (e.g., image/jpeg)

  // Skip if no path or not an image
  if (!filePath || !contentType.startsWith("image/")) return null;

  // Get a reference to the bucket where the file was uploaded
  const bucket = admin.storage().bucket(object.bucket);

  // Temporary local path to download the file for processing
  const tempFilePath = join(tmpdir(), basename(filePath));

  // Download the uploaded file from storage to the temp path
  await bucket.file(filePath).download({ destination: tempFilePath });

  // Initialize sharp with the downloaded file
  const image = sharp(tempFilePath);

  // Compress the image based on its type
  if (contentType.includes("jpeg") || contentType.includes("jpg")) {
    // JPEG compression: set quality to 70%
    await image.jpeg({ quality: 70 }).toFile(tempFilePath);
  } else if (contentType.includes("png")) {
    // PNG compression: set compression level (0–9)
    await image.png({ compressionLevel: 8 }).toFile(tempFilePath);
  }

  // Upload the compressed image back to the **same location**, overwriting the original
  await bucket.upload(tempFilePath, { destination: filePath });

  // Remove the temporary file from the local system
  await fs.unlink(tempFilePath);

  // Log success for debugging
  console.log(`Compressed and replaced: ${filePath}`);

  return null; // Cloud Functions v2 requires a return value (null here)
});

export const notifySubscribersOnNewBlog = functions.firestore.onDocumentCreated(
  "blogs/{blogId}",
  async (event) => {
    const snap = event.data;
    if (!snap || !snap.exists) return;
    const blog = snap.data() as BlogType;
    const id = snap.id;
    const { blogMeta } = blog;
    const { topic, title } = blogMeta;
    if (!topic || !title) {
      console.log("Blog missing topic or title — skipping notification.");
      return;
    }
    try {
      // 1. Get subscribers interested in this topic
      const subsSnap = await admin
        .firestore()
        .collection("subscribers")
        .where("topics", "array-contains", topic)
        .get();
      if (subsSnap.empty) {
        console.log("No subscribers for topic:", topic);
        return;
      }

      // 2. Extract emails & remove duplicates
      const emailSet = new Set<string>();
      subsSnap.docs.forEach((doc) => {
        const data = doc.data() as { email: string; topics: string[] };
        if (data.email) emailSet.add(data.email);
      });
      const emails = Array.from(emailSet);
      console.log(
        `Sending to ${emails.length} subscribers for topic "${topic}"`
      );
      if (emails.length === 0) return;

      // 3. Compose link
      const blogLink = `${window.location.origin}/${topic}/${id}`;

      // 4. Add a document to the Trigger Email collection
      await admin
        .firestore()
        .collection(EMAIL_COLLECTION)
        .add({
          bcc: emails,
          from: '"Bernard" <bernard.i.kuria@gmail.com>',
          message: {
            subject: `New blog: ${title}`,
            text: `A new blog on ${topic} was just posted.`,
            html: `<h2>${title}</h2> <p>A new article on <strong>${topic}</strong> just dropped.</p> <p><a href="${blogLink}">Read the blog</a></p>`,
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      console.log("Trigger Email document created successfully.");
    } catch (err) {
      console.error("Error sending subscriber notifications:", err);
    }
  }
);

export const sendContactMessage = functions.https.onCall(
  async (data: unknown) => {
    const payload =
      typeof data === "object" && data !== null && "data" in data
        ? (data as Record<string, unknown>).data
        : data;

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("message" in payload) ||
      !("email" in payload)
    ) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Message and email are required."
      );
    }

    const { message, email } = payload as ContactType;

    console.log("sendContactMessage invoked", message, email);

    try {
      await admin
        .firestore()
        .collection(EMAIL_COLLECTION)
        .add({
          from: '"Bernard" <bernard.i.kuria@gmail.com>',
          to: "bernard.i.kuria@gmail.com",
          replyTo: email,
          message: {
            subject: "New message from my life uncharted website contact form",
            text: `${message}\n\nFrom: ${email}`,
            html: `<p>${message}</p><br/><p>From: ${email}</p>`,
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log("Contact email added to email collection:", email);
      return { success: true };
    } catch (err) {
      console.error("Error adding contact email:", err);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send contact message."
      );
    }
  }
);

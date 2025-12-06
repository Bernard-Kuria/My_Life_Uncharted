import * as functions from "firebase-functions/v2";

import * as admin from "firebase-admin";

import { BlogType, ContactType } from "../utils/types";

admin.initializeApp();
const EMAIL_COLLECTION = "email";
const BASE_URL = "https://my-life-uncharted.vercel.app";

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
      const blogLink = `${BASE_URL}/${topic}/${id}`;

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

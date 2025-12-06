"use client";

import { useRef, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@lib/firebase";

export const useContacts = () => {
  const [notification, setNotification] = useState<string | undefined>();
  const [notificationStatus, setNotificationStatus] = useState<
    "ok" | "error" | "info" | null
  >(null);
  const thoughtRef = useRef<HTMLTextAreaElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const thoughtValue = thoughtRef.current?.value.trim();
    const emailValue = emailRef.current?.value.trim();

    let message = "";

    if (!thoughtValue) {
      message = "Tell me something";
      thoughtRef.current?.focus();
      setNotification(message);
      setNotificationStatus("info");
      return;
    }

    if (!emailValue) {
      message = "Add an email";
      emailRef.current?.focus();
      setNotification(message);
      setNotificationStatus("info");
      return;
    }

    setNotification("Sending..");
    setNotificationStatus("info");

    try {
      const sendMessage = httpsCallable(functions, "sendContactMessage");
      await sendMessage({ message: thoughtValue, email: emailValue });

      message = "Submitted successfully!";
      setNotificationStatus("ok");

      setNotification(message);

      if (thoughtRef.current) thoughtRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";

      thoughtRef.current?.blur();
      emailRef.current?.blur();
    } catch (err) {
      console.error(err);
      setNotification("Failed to send message. Try again later.");
      setNotificationStatus("error");
    }
  };

  return {
    handleSubmit,
    notification,
    setNotification,
    notificationStatus,
    setNotificationStatus,
    thoughtRef,
    emailRef,
  };
};

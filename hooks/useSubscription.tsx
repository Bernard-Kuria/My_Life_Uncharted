"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

import { getAllTopics } from "@services/topics";
import { BlogTopicsType } from "@lib/types/types";
import { addSubscriber, deleteSubscriber } from "@services/subscribers";

interface TopicStatus {
  [key: string]: boolean;
}

export default function useSubscription() {
  const [notification, setNotification] = useState<string | undefined>();
  const [notificationStatus, setNotificationStatus] = useState<
    "ok" | "error" | "info" | null
  >("info");
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [checkedTopics, setCheckedTopics] = useState<TopicStatus>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [connectEmail, setConnectEmail] = useState("");
  const [disconnectEmail, setDisconnectEmail] = useState("");
  const [connecting, setConnecting] = useState<boolean>(false);
  const [disconnecting, setDisconnecting] = useState<boolean>(false);

  // 1. Fetch topics
  useEffect(() => {
    async function fetchTopics() {
      const list = await getAllTopics();
      setTopics(list);
    }
    fetchTopics();
  }, []);

  // 2. Initialize checkedTopics once topics are loaded
  useEffect(() => {
    if (topics.length === 0) return;

    const status: TopicStatus = {};
    topics.forEach((t) => (status[t.title] = true));
    setCheckedTopics(status);
  }, [topics]);

  // 3. Derive selected topics from checkedTopics
  useEffect(() => {
    const active = Object.entries(checkedTopics)
      .filter(([_, isChecked]) => isChecked)
      .map(([topic]) => topic);

    setSelectedTopics(active);
  }, [checkedTopics]);

  // 4. Toggle a checkbox
  const handleCheckboxChange = useCallback((topicName: string) => {
    setCheckedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName],
    }));
  }, []);

  // 5. Submit
  const handleConnect = async (e: FormEvent) => {
    e.preventDefault();
    setConnecting(true);

    try {
      await addSubscriber({
        email: connectEmail,
        topics: selectedTopics,
      });
      setNotification("Connection successful!");
      setNotificationStatus("ok");
    } catch (error) {
      setNotification(error as string);
      setNotificationStatus("error");
    } finally {
      setConnectEmail("");
      setConnecting(false);
    }
  };

  // 6. Handle Delete Subscription
  const handleDisconnect = async (e: FormEvent) => {
    e.preventDefault();
    setDisconnecting(true);

    try {
      await deleteSubscriber(disconnectEmail);
      setNotification("disconnected successfully!");
      setNotificationStatus("ok");
    } catch (error) {
      setNotification(error as string);
      setNotificationStatus("error");
    } finally {
      setDisconnectEmail("");
      setDisconnecting(false);
    }
  };

  return {
    topics,
    checkedTopics,
    handleConnect,
    connecting,
    connectEmail,
    setConnectEmail,
    disconnecting,
    disconnectEmail,
    setDisconnectEmail,
    handleCheckboxChange,
    handleDisconnect,
    notification,
    setNotification,
    notificationStatus,
    setNotificationStatus,
  };
}

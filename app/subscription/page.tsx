"use client";

import SectionTitle from "@components/SectionTitle";
import { BlogTopicsType } from "@lib/types/types";
import { addSubscription, deleteSubscription } from "@services/subscriptions";
import { getAllTopics } from "@services/topics";
import { useState, useCallback, FormEvent, useEffect } from "react";

interface TopicStatus {
  [key: string]: boolean;
}

export default function Subscription() {
  const [topics, setTopics] = useState<BlogTopicsType>([]);
  const [checkedTopics, setCheckedTopics] = useState<TopicStatus>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");

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
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addSubscription({
      email,
      topics: selectedTopics,
    });

    console.log("Form submitted:", { email, selectedTopics });
  };

  // 6. Delete Subscription
  const handleDeleteSubscription = async (e: FormEvent) => {
    e.preventDefault();

    await deleteSubscription(deleteEmail);

    console.log("Subscription disconnected!");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 page-layout">
      <form
        className="flex flex-col gap-5 w-full md:w-[500px]"
        onSubmit={handleFormSubmit}
      >
        <SectionTitle title="Stay in touch" />

        <div className="border border-(--secondary-blue) rounded-[10px] p-2 md:p-5 grid gap-5">
          <div className="grid gap-5">
            {`Get connected so you don't miss a content on the topics you love.`}

            <div>
              <div>Your email:</div>
              <input
                type="email"
                value={email}
                placeholder="example@test.com"
                required
                className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div>I want to receive notifications on topics:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topicObj) => {
                  const checkboxId = `checkbox-${topicObj.title.replace(
                    /\s/g,
                    "-"
                  )}`;
                  const topic = topicObj.title;

                  return (
                    <label
                      key={topic}
                      htmlFor={checkboxId}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={checkedTopics[topic] ?? false}
                          onChange={() => handleCheckboxChange(topic)}
                          className="appearance-none h-5 w-5 border-2 border-(--secondary-blue) rounded-full focus:outline-none peer"
                        />
                        <div className="absolute left-1 h-3 w-3 rounded-full bg-(--primary-blue) opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      {topic}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <button type="submit" className="button">
            Connect
          </button>
        </div>
      </form>

      <form
        className="border border-(--secondary-blue) flex flex-col p-2 md:p-5 gap-5 w-full md:w-[500px] rounded-2xl"
        onSubmit={handleDeleteSubscription}
      >
        You can also disconnect anytime ;)
        <div>
          <div>Your email:</div>
          <input
            type="email"
            placeholder="example@test.com"
            value={deleteEmail}
            className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
            onChange={(e) => setDeleteEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Disconnect
        </button>
      </form>
    </div>
  );
}

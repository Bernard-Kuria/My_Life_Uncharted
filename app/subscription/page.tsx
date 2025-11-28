"use client";

import SectionTitle from "@components/SectionTitle";
import { useState, useCallback, FormEvent } from "react";

const topicsList: string[] = [
  "Life on wheels",
  "Startups & Ideas",
  "Projects & Tech",
];

interface TopicStatus {
  [key: string]: boolean;
}

export default function Subscription() {
  const [checkedTopics, setCheckedTopics] = useState<TopicStatus>(
    topicsList.reduce((acc, topic) => {
      acc[topic] = true;
      return acc;
    }, {} as TopicStatus)
  );

  const handleCheckboxChange = useCallback((topicName: string): void => {
    setCheckedTopics((prevTopics) => ({
      ...prevTopics,
      [topicName]: !prevTopics[topicName],
    }));
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with topics:", checkedTopics);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 page-layout">
      <form
        className="flex flex-col gap-5 w-full md:w-[500px]"
        onSubmit={handleFormSubmit}
      >
        <SectionTitle title="Stay in touch" />

        <div className="border border-(--secondary-blue) dark:border-(--primary-blue) rounded-[10px] p-2 md:p-5 grid gap-5">
          <div className="grid gap-5">
            {`Get connected so you don't miss a content on the topics you love.`}
            <div>
              <div>Your email:</div>
              <input
                type="email"
                placeholder="example@test.com"
                className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
              />
            </div>
            <div>
              <div>I want to receive notifications on topics:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {topicsList.map((topic) => {
                  const checkboxId = `checkbox-${topic.replace(/\s/g, "-")}`;

                  return (
                    <label
                      key={topic}
                      htmlFor={checkboxId}
                      className="flex items-center gap-2"
                    >
                      <div className="relative flex items-center">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          value={topic}
                          checked={checkedTopics[topic]}
                          onChange={() => handleCheckboxChange(topic)}
                          className="appearance-none h-5 w-5 border-2 border-(--secondary-blue) rounded-full focus:outline-none peer"
                        />
                        <div
                          className={`absolute rounded-full top-1/5 left-1/5 transform h-3 w-3 bg-(--primary-blue) opacity-0 peer-checked:opacity-100 pointer-events-none`}
                        ></div>
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
        className="border border-(--secondary-blue) dark:border-(--primary-blue) flex flex-col p-2 md:p-5 gap-5 w-full md:w-[500px] rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        You can also disconnect anytime ;)
        <div>
          <div>Your email:</div>
          <input
            type="email"
            placeholder="example@test.com"
            className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
          />
        </div>
        <button type="submit" className="button">
          Disconnect
        </button>
      </form>
    </div>
  );
}

"use client";

import SectionTitle from "@components/SectionTitle";
import { useState } from "react";

const topics = ["Life on wheels", "Startups & Ideas", "Projects & Tech"];

export default function Subscription() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center gap-10 page-layout">
      <form className="flex flex-col gap-5 w-full md:w-[500px]">
        <SectionTitle title="Stay in touch" />

        <div className="border border-(--secondary-blue) dark:border-(--primary-blue) rounded-2xl p-2 grid gap-5">
          <div className="grid gap-5">
            {`Get connected so you don't miss a content on the topics you love.`}
            <div>
              <div>Your email:</div>
              <input
                type="email"
                placeholder="example@test.com"
                className="border border-(--secondary-blue) w-full rounded-2xl px-4 py-2 text-foreground"
              />
            </div>
            <div>
              <div>I want to receive notifications on topics:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <label htmlFor="" key={topic} className="flex gap-2">
                    <input
                      type="checkbox"
                      value={topic}
                      checked={isChecked}
                      onChange={() => setIsChecked((prev) => !prev)}
                      // 1. Hide the default input appearance
                      className="h-5 w-5 appearance-none opacity-0 absolute peer"
                    />

                    {/* 2. The visual replacement element (the outer circle) */}
                    <div className="h-5 w-5 rounded-full border border-blue-500 flex items-center justify-center peer-checked:border-blue-500 transition-all duration-200 relative">
                      {/* 3. The inner blue dot (initially hidden) */}
                      <span
                        // We use inline styles or a utility for the dot appearance when checked
                        className={`block h-3 w-3 rounded-full bg-blue-500 transition-opacity duration-200 ${
                          isChecked
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      />
                    </div>
                    {topic}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="button" onClick={(e) => e.preventDefault()}>
            Connect
          </button>
        </div>
      </form>
      <form className="border border-(--secondary-blue) dark:border-(--primary-blue) flex flex-col gap-5 w-full md:w-[500px] rounded-2xl p-2">
        You can also disconnect anytime ;)
        <div>
          <div>Your email:</div>
          <input
            type="email"
            placeholder="example@test.com"
            className="border border-(--secondary-blue) w-full rounded-2xl px-4 py-2 text-foreground"
          />
        </div>
        <button className="button" onClick={(e) => e.preventDefault()}>
          Disconnect
        </button>
      </form>
    </div>
  );
}

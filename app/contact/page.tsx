"use client";

import SectionTitle from "@components/SectionTitle";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, FormEvent, useRef, useCallback } from "react";
import Link from "next/link";

const socials = [
  // ... (socials array remains the same as your original code) ...
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fas", "globe"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-(--primary-blue) dark:text-(--secondary-blue)",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "instagram"] as [IconPrefix, IconName],
    bg: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_10%,#fd5949_40%,#d6249f_70%,#285aeb_100%)]",
    iconColor: "text-white",
    isGradient: true,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "github"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "x-twitter"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "facebook-f"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-(--primary-blue) dark:text-(--secondary-blue)",
    isGradient: false,
  },
];

export default function Contact() {
  const [notification, setNotification] = useState<string | undefined>();
  const thoughtRef = useRef<HTMLTextAreaElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    const thoughtValue = thoughtRef.current?.value.trim();
    const emailValue = emailRef.current?.value.trim();

    let message = "";

    if (!thoughtValue) {
      message = "Tell me something";
      thoughtRef.current?.focus();
    } else if (!emailValue) {
      message = "Add an email";
      emailRef.current?.focus();
    } else {
      message = "Submitted successfully";

      if (thoughtRef.current) thoughtRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";

      thoughtRef.current?.blur();
      emailRef.current?.blur();
    }

    setNotification(message);

    setTimeout(() => {
      setNotification(undefined);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center page-layout">
      <form
        className="flex flex-col gap-5 w-full md:w-[400px]"
        onSubmit={handleSubmit}
      >
        <SectionTitle title="Let's talk" />
        <div>
          Feel free to follow me on my socials :)
          <div className="flex items-center justify-around h-[40px] border-[3px] border-(--secondary-blue) rounded-[10px]">
            {socials.map((social, idx) => (
              <Link key={idx} href={social.socialHandle}>
                <span
                  className={`
                ${social.bg}
                flex items-center justify-center
                h-7 w-7 rounded-lg
              `}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className={`${social.iconColor} text-[20px]`}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-(--primary-blue) dark:text-(--secondary-blue)">
          {`I'd love to hear your thoughts`} &#x2764;
          <div>
            <textarea
              ref={thoughtRef}
              placeholder="share your thoughts..."
              className="px-4 py-2 border border-(--secondary-blue) w-full h-[200px] rounded-[10px] text-foreground"
            />
            <div>Your email:</div>
            <div className="flex items-center gap-[10px]">
              <input
                ref={emailRef}
                type="email"
                placeholder="example@test.com"
                required
                className="flex-1 border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
              />
              <div className="w-[50px] h-full">
                <button type="submit" className="w-full button">
                  <FontAwesomeIcon
                    icon={["far", "paper-plane"]}
                    className={`text-[15px]`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div
        className={`
          pointer-events-none absolute mt-4 p-3 bg-green-500 text-white rounded-lg shadow-lg
          transition-all duration-1000 ease-in-out
          ${
            notification !== undefined
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-20px]"
          }
        `}
        role="status"
        aria-live="polite"
      >
        {notification}
      </div>
    </div>
  );
}

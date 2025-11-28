"use client";

import SectionTitle from "@components/SectionTitle";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const socials = [
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fas", "globe"],
    bg: "bg-transparent",
    iconColor: "text-(--primary-blue) dark:text-(--secondary-blue)",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "instagram"],
    bg: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_10%,#fd5949_40%,#d6249f_70%,#285aeb_100%)]",
    iconColor: "text-white",
    isGradient: true,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "github"],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "x-twitter"],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://bernard-webfolio.web.app",
    icon: ["fab", "facebook-f"],
    bg: "bg-transparent",
    iconColor: "text-(--primary-blue) dark:text-(--secondary-blue)",
    isGradient: false,
  },
];

export default function Contact() {
  return (
    <div className="flex flex-col justify-center items-center page-layout">
      <form className="flex flex-col gap-5 w-full md:w-[400px]">
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
                    icon={social.icon as [IconPrefix, IconName]}
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
              placeholder="share your thoughts..."
              className="px-4 py-2 border border-(--secondary-blue) w-full h-[200px] rounded-[10px] text-foreground"
            />
            <div>Your email:</div>
            <div className="flex items-center gap-[10px]">
              <input
                type="email"
                placeholder="example@test.com"
                className="flex-1 border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
              />
              <div className="w-[50px] h-full">
                <button
                  className="w-full button"
                  onClick={(e) => e.preventDefault()}
                >
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
    </div>
  );
}

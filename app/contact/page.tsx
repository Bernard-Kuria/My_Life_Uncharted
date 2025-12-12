"use client";

import SectionTitle from "@components/SectionTitle";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Notification from "@components/Notification";
import { useContacts } from "@hooks/useContacts";

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
    socialHandle: "https://www.instagram.com/bena_isaiah/",
    icon: ["fab", "instagram"] as [IconPrefix, IconName],
    bg: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_10%,#fd5949_40%,#d6249f_70%,#285aeb_100%)]",
    iconColor: "text-white",
    isGradient: true,
  },
  {
    socialHandle: "https://github.com/Bernard-Kuria",
    icon: ["fab", "github"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://x.com/BernardKur55605",
    icon: ["fab", "x-twitter"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-black",
    isGradient: false,
  },
  {
    socialHandle: "https://www.facebook.com/bernard.kuria.161786",
    icon: ["fab", "facebook-f"] as [IconPrefix, IconName],
    bg: "bg-transparent",
    iconColor: "text-(--primary-blue) dark:text-(--secondary-blue)",
    isGradient: false,
  },
];

export default function Contact() {
  const {
    handleSubmit,
    notification,
    setNotification,
    notificationStatus,
    setNotificationStatus,
    thoughtRef,
    emailRef,
  } = useContacts();

  return (
    <div className="flex flex-col justify-center items-center page-layout">
      <form
        className="flex flex-col gap-5 w-full md:w-[400px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <SectionTitle title="Let's talk" />
        <div>
          Feel free to follow me on my socials :)
          <div className="flex items-center justify-around h-10 border-[3px] border-(--secondary-blue) rounded-[10px]">
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
            <div className="flex items-center gap-2.5">
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

      <Notification
        notification={notification}
        setNotification={setNotification}
        notificationStatus={notificationStatus}
        setNotificationStatus={setNotificationStatus}
      />
    </div>
  );
}

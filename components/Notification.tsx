"use client";

import { Dispatch, SetStateAction, useEffect, useReducer } from "react";

const BG: Record<ColourType, string> = {
  red: "rgba(255, 0, 0, 0.6)",
  green: "rgba(0, 255, 0, 0.6)",
  blue: "rgba(0, 0, 255, 0.6)",
};

const ACTIONS = {
  GOOD: "ok",
  BAD: "error",
  INFO: "info",
} as const;

type ColourType = "red" | "green" | "blue";
type StatusType = (typeof ACTIONS)[keyof typeof ACTIONS];
type Action = { type: StatusType };

function reducer(state: ColourType, action: Action): ColourType {
  switch (action.type) {
    case ACTIONS.GOOD:
      return "green";
    case ACTIONS.INFO:
      return "blue";
    case ACTIONS.BAD:
      return "red";
    default:
      return state;
  }
}

export default function Notification({
  notification,
  setNotification,
  notificationStatus,
  setNotificationStatus,
}: {
  notification: string | undefined;
  setNotification: Dispatch<SetStateAction<string | undefined>>;
  notificationStatus: StatusType | null;
  setNotificationStatus: Dispatch<SetStateAction<StatusType | null>>;
}) {
  const [colour, dispatch] = useReducer(reducer, "blue");

  useEffect(() => {
    if (!notificationStatus) {
      dispatch({ type: "info" });
    } else {
      dispatch({ type: notificationStatus });
    }
  }, [notificationStatus]);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(undefined);
      setNotificationStatus(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification, setNotification, setNotificationStatus]);

  return (
    <div className={`top-1/3 absolute w-[250px] grid justify-center`}>
      <div
        style={{
          background: BG[colour],
          border: "2px",
          borderColor: colour,
          color: "white",
        }}
        className={`pointer-events-none mt-4 p-3 border rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${
          notification
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-30px]"
        }`}
        role="status"
        aria-live="polite"
      >
        {notification}
      </div>
    </div>
  );
}

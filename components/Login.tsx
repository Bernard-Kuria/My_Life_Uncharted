"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface LoginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const router = useRouter();
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);
  const loginModalBackgroundRef = useRef<HTMLDivElement | null>(null);
  const loginContainerRef = useRef<HTMLDivElement | null>(null);

  function handleLogin() {
    setCorrect(true);
    return;
  }

  useEffect(() => {
    if (correct) {
      router.push("/dashboard");
      setIsLoggedIn(false);
    }
  }, [correct, router]);

  function cancelLoginWindow() {
    setIsLoggedIn(false);
  }

  function handleContainerClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
  }

  return (
    <div
      ref={loginModalBackgroundRef}
      className="absolute w-full h-full z-1"
      onClick={cancelLoginWindow}
    >
      <div
        ref={loginContainerRef}
        className="grid gap-[10px] w-[400px] h-[300px] border border-(--border-color) rounded-2xl translate-x-[calc(50vw-200px)] translate-y-[50vh] bg-white/50 p-5 text-(--primary-blue)"
        onClick={handleContainerClick}
      >
        Login
        <div
          className={`grid gap-[5px] h-fit border ${
            correct === undefined || correct === true
              ? "border-(--border-color)"
              : "border-red-500"
          } rounded-2xl p-2`}
        >
          username:{" "}
          <input
            className="focus:outline-none"
            type="text"
            placeholder="enter username"
          />
        </div>
        <div
          className={`grid gap-[5px] h-fit border ${
            correct === undefined || correct === true
              ? "border-(--border-color)"
              : "border-red-500"
          } rounded-2xl p-2`}
        >
          password:{" "}
          <input
            className="focus:outline-none"
            type="text"
            placeholder="enter password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="grid gap-[5px] h-fit border border-(--border-color) rounded-2xl p-2 text-(--primary-blue) bg-(--secondary-blue) hover:text-(--secondary-blue) hover:bg-(--primary-blue) duration-300 cursor-pointer"
        >
          Enter Password
        </button>
        {correct === undefined || correct === true ? (
          ""
        ) : (
          <div className="text-red-500 text-center">
            *Wrong username or password*
          </div>
        )}
      </div>
    </div>
  );
}

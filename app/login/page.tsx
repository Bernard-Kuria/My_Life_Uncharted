"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);
  const loginModalBackgroundRef = useRef<HTMLDivElement | null>(null);
  const loginContainerRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loggingState, setLoggingState] = useState<string>("");
  const [InputCheck, setInputCheck] = useState<string>("");

  async function handleLogin() {
    setCorrect(undefined);
    try {
      if (email && password) {
        setLoggingState("Logging in...");
        await signInWithEmailAndPassword(auth, email, password);
        setCorrect(true);
        setLoggingState("successfull");
        setTimeout(() => {
          setLoggingState("");
        }, 500);

        setEmail("");
        setPassword("");
      } else {
        setInputCheck("*email or password unavailable.*");
        return;
      }
    } catch (error) {
      if (error instanceof Error) setInputCheck(error.message);
      setCorrect(false);
      setLoggingState("unsuccessful");
      setTimeout(() => {
        setLoggingState("");
      }, 800);
    }
  }

  useEffect(() => {
    if (correct) {
      router.push("/dashboard");
    }
  }, [correct, router]);

  function handleContainerClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
  }

  return (
    <div
      ref={loginModalBackgroundRef}
      className="relative h-[calc(100vh-100px)] page-layout z-1 flex flex-col justify-center items-center"
    >
      <button
        className="absolute top-0 left-2 border-0"
        onClick={() => router.push("/")}
      >
        &larr; Back
      </button>
      <div
        ref={loginContainerRef}
        className="grid gap-2.5 w-full md:w-[400px] min-h-[300px] border border-(--border-color) rounded-2xl bg-white/50 p-5 text-(--primary-blue)"
        onClick={handleContainerClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        tabIndex={0} // allows div to capture keyboard events
      >
        Login <span className="text-red-500">{InputCheck}</span>
        <div
          className={`grid gap-[5px] h-fit border ${
            correct === undefined || correct === true
              ? "border-(--border-color)"
              : "border-red-500"
          } rounded-2xl p-2`}
        >
          email:
          <input
            className="focus:outline-none"
            type="email"
            placeholder="enter email"
            value={email || ""}
            onChange={(e) => {
              setInputCheck("");
              setEmail(e.target.value);
            }}
          />
        </div>
        <div
          className={`grid gap-[5px] h-fit border ${
            correct === undefined || correct === true
              ? "border-(--border-color)"
              : "border-red-500"
          } rounded-2xl p-2`}
        >
          password:
          <input
            className="focus:outline-none"
            type="password"
            placeholder="enter password"
            value={password || ""}
            onChange={(e) => {
              setInputCheck("");
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleLogin}
          className="grid gap-[5px] h-fit border border-(--border-color) rounded-2xl p-2 text-(--primary-blue) bg-(--secondary-blue) hover:text-(--secondary-blue) hover:bg-(--primary-blue) duration-300 cursor-pointer"
        >
          {loggingState.length > 0 ? loggingState : "Login"}
        </button>
        {correct === false && (
          <div className="text-red-500 text-center">
            *Wrong email or password*
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";
import {
  onAuthStateChanged,
  User,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

export function useRequireAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loginLoading, setLoginLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.replace("/login");
      }
      setLoginLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSavePassword = async () => {
    if (!auth.currentUser || !oldPassword || !newPassword) {
      setMessage("Please fill in both fields");
      return;
    }

    try {
      // Step 1: Re-authenticate
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Step 2: Update password
      await updatePassword(auth.currentUser, newPassword);

      setMessage("Password updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      if (error instanceof Error) setMessage(`Error: ${error.message}`);
    }
  };

  return {
    user,
    loginLoading,
    handleLogOut,
    handleSavePassword,
    message,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
  };
}

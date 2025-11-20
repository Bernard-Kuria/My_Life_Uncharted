import type { Metadata } from "next";

import { Mulish, Lexend } from "next/font/google";

import "./globals.css";

import Header from "@c/Header";
import Socials from "@c/Socials";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My Life Uncharted",
    template: "%s | My Life Uncharted", // Template for child pages
  },
  description: "A creative space for me to showcase a glimpse of myself",
  keywords: ["creative", "blog", "portfolio"],
  other: {
    "app-version": "1.0.0",
  },
  // You can also define specific Open Graph, Twitter, etc. metadata here
  openGraph: {
    title: "My Life Uncharted",
    description: "A creative space for me to showcase a glimpse of myself",
    type: "website",
    url: "my-life-uncharted.vercel.app",
    siteName: "My Life Uncharted",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${lexend.variable} antialiased w-full min-h-screen transition-colors duration-500 pb-[30px]`}
      >
        <Header />
        <Socials />
        {children}
      </body>
    </html>
  );
}

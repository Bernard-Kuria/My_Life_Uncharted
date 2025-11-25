"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Draft } from "@lib/types/types";

export default function BlogsList({ blog }: { blog: Draft }) {
  const location = usePathname();

  return (
    <div className="h-[200px] border rounded-[10px] flex-1 p-5">
      <Link className="flex-1" href={`${location}/${blog.id}draft`}>
        <div className="flex-1 flex flex-col gap-[15px]">
          <div className="sub-title">{blog.draftMeta.title}</div>
          <div className="flex-1 blog-font">{blog.draftMeta.subtitle}</div>
        </div>
      </Link>
    </div>
  );
}

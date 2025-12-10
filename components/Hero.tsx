"use client";

import { useRef } from "react";
import Image from "next/image";

import { usePathInteractions } from "@hooks/usePathInteractions";

type HeroProps = {
  mainImg: string | undefined;
  secondaryTopImg: string | undefined;
  secondaryBottomImg: string | undefined;
};

export default function Hero({
  mainImg,
  secondaryTopImg,
  secondaryBottomImg,
}: HeroProps) {
  const path = useRef<SVGPathElement>(null);
  usePathInteractions(path);

  const lines = [
    {
      width: "200",
      height: "15",
      top: "50%",
      left: "-100px",
      color: "bg-(--primary-blue)",
    },
    {
      width: "210",
      height: "30",
      top: "30px",
      left: "30%",
      color: "bg-(--foreground)",
    },
    {
      width: "170",
      height: "30",
      top: "338px",
      left: "275px",
      color: "bg-(--foreground)",
    },
    {
      width: "70",
      height: "30",
      top: "390px",
      left: "541px",
      color: "bg-(--primary-blue)",
    },
    {
      width: "210",
      height: "25",
      top: "70%",
      left: "930px",
      color: "bg-(--primary-blue)",
    },
  ];

  return (
    <div className="relative w-full rounded-[10px] border-(--border-color) flex items-center flex-col-reverse lg:flex-row lg:h-[450px] mt-10 p-2.5 lg:p-[30px] border-[5px]">
      <div className="merriweather-font text-[20px] lg:text-[80px] flex-1 font-semibold leading-tight">
        Miles, <span className="text-(--primary-blue)">Mindsets</span> & Making
        Stuff
      </div>

      {/* Main image */}
      <svg
        viewBox="0 0 300 300"
        width={window.innerWidth < 1024 ? 285 : 350}
        height={350}
      >
        <defs>
          <clipPath id="image-edge" clipPathUnits="userSpaceOnUse">
            <path ref={path} d=""></path>
          </clipPath>
        </defs>

        <foreignObject width="300" height="300" clipPath="url(#image-edge)">
          <Image
            src={mainImg || ""}
            alt="Main Image"
            width={350}
            height={700}
            unoptimized
            priority
            className="object-cover object-[0%_30%] scale-200"
          />
        </foreignObject>
      </svg>

      {window.innerWidth >= 1024 ? (
        <div className="absolute top-[-68px] left-[-70px]">
          <div className="relative p-[3px]">
            <BorderLines />
            <div className="relative w-[143px] h-[198px] overflow-hidden">
              <Image
                src={secondaryTopImg || ""}
                alt="image1 image"
                width={286}
                height={396}
                unoptimized
                className="w-full h-full object-cover object-[-0%_40%] scale-200"
              />
            </div>
          </div>
        </div>
      ) : null}

      {window.innerWidth >= 1024 ? (
        <div className="absolute top-[360px] left-[-70px] p-1">
          <div className="relative p-[3px]">
            <BorderLines />
            <div className="relative w-[292px] h-[143px] overflow-hidden">
              <Image
                src={secondaryBottomImg || ""}
                alt="image2 image"
                fill
                sizes="(max-width: 768px) 100vw, 292px"
                unoptimized
                className="object-cover object-[0%_40%]"
              />
            </div>
          </div>
        </div>
      ) : null}

      {window.innerWidth >= 1024
        ? lines.map((line, i) => (
            <div
              key={i}
              className={`absolute ${line.color}`}
              style={{
                width: `${line.width}px`,
                height: `${line.height}px`,
                top: line.top,
                left: line.left,
              }}
            />
          ))
        : null}

      <div className="absolute h-auto left-[70%] top-1 flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <LineBreaks key={i} />
        ))}
      </div>

      <div className="absolute h-auto left-[30%] bottom-1 flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <LineBreaks key={i} />
        ))}
      </div>
    </div>
  );
}

function BorderLines() {
  return (
    <>
      <div className="absolute top-0 left-0">
        <div className="w-5 h-px bg-(--secondary-blue)"></div>
        <div className="w-5 h-px bg-(--secondary-blue) rotate-90 -translate-x-2.5 translate-y-[9px]"></div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="w-5 h-px bg-(--secondary-blue) translate-y-px"></div>
        <div className="w-5 h-px bg-(--secondary-blue) rotate-90 translate-x-2.5 -translate-y-2.5"></div>
      </div>
    </>
  );
}

function LineBreaks() {
  return (
    <div
      className={`bg-background`}
      style={{
        width: `20px`,
        height: `6px`,
        transform: `rotate(135deg)`,
      }}
    ></div>
  );
}

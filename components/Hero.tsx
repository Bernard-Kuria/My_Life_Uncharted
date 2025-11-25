"use client";

import { useRef } from "react";
import Image from "next/image";

import { usePathInteractions } from "@hooks/usePathInteractions";

type HeroProps = {
  landingPageImages: string[];
};

export default function Hero({ landingPageImages }: HeroProps) {
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

  if (!landingPageImages || landingPageImages.length === 0) {
    return <div>Loading images...</div>;
  }

  const images = {
    main: landingPageImages.find((url) => url.includes("chill")),
    image1: landingPageImages.find((url) => url.includes("bike-riding")),
    image2: landingPageImages.find((url) => url.includes("jkuat-hackathon")),
  };

  return (
    <div className="relative w-full rounded-[10px] border-(--border-color) flex items-center flex-col-reverse lg:flex-row lg:h-[450px] mt-[40px] p-[10px] lg:p-[30px] border-[5px]">
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
            src={images.main || ""}
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
                src={images.image1 || ""}
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
        <div className="absolute top-[360px] left-[-70px] p-[4px]">
          <div className="relative p-[3px]">
            <BorderLines />
            <div className="relative w-[292px] h-[143px] overflow-hidden">
              <Image
                src={images.image2 || ""}
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

      <div className="absolute h-auto left-[70%] top-[-4px] flex">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <LineBreaks key={i} />
        ))}
      </div>

      <div className="absolute h-auto left-[30%] bottom-[-4px] flex">
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
        <div className="w-[20px] h-[1px] bg-(--secondary-blue)"></div>
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) rotate-90 -translate-x-[10px] translate-y-[9px]"></div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) translate-y-[1px]"></div>
        <div className="w-[20px] h-[1px] bg-(--secondary-blue) rotate-90 translate-x-[10px] -translate-y-[10px]"></div>
      </div>
    </>
  );
}

function LineBreaks() {
  return (
    <div
      className={`bg-(--background)`}
      style={{
        width: `20px`,
        height: `6px`,
        transform: `rotate(135deg)`,
      }}
    ></div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { handleThemeBtnClick } from "../../lib/Draftify/ToolBarHooks/ToggleEffects";
import {
  handleDownloadJSON,
  handleCopy,
  exportBlocksToDocx,
} from "../../lib/Draftify/ToolBarHooks/ToolBarInteractions";

export default function ToolBar({ view, setView, blocksData }) {
  const [copy, setCopy] = useState(false);
  const themeModeBtn = useRef(null);
  const themeModeToggle = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  }, [copy]);

  return (
    <div className="md:h-10">
      <div className="relative grid md:flex items-center text-[12px] italic gap-2.5">
        <div className="md:flex gap-2.5 items-center font-bold logo-text text-[20px]">
          DRAFTIFY PRO{" "}
          <div className="underline font-normal text-[12px]">
            Write. Create. Build your story block by block.
          </div>
        </div>
        <div className="md:absolute right-0 flex items-center gap-2.5">
          <button
            className="border rounded-2.5 bg-(--secondary-blue) text-white hover:font-semibold hover:bg-(--primary-blue) p-1 cursor-pointer"
            onClick={() => handleDownloadJSON(blocksData)}
          >
            Download JSON <FontAwesomeIcon icon={["fas", "download"]} />
          </button>
          <button
            className="border rounded-2.5 bg-(--secondary-blue) text-white hover:font-semibold hover:bg-(--primary-blue) p-1 cursor-pointer"
            onClick={() => exportBlocksToDocx(blocksData)}
          >
            Export .docx <FontAwesomeIcon icon={["fas", "download"]} />
          </button>
          <div
            className={`p-1 cursor-pointer ${
              copy ? "text-green-400" : "text-(--secondary-blue)"
            }`}
          >
            <FontAwesomeIcon
              icon={["fas", `${copy ? "check" : "copy"}`]}
              onClick={() => handleCopy(blocksData, setCopy)}
            />
          </div>
          <div
            ref={themeModeBtn}
            className="border w-[30px] h-4 rounded-4 cursor-pointer duration-300 flex items-center p-0"
            onClick={() => {
              setView((prev) => (prev === "editor" ? "preview" : "editor"));
              handleThemeBtnClick(
                view,
                themeModeBtn.current,
                themeModeToggle.current
              );
            }}
          >
            <div
              ref={themeModeToggle}
              className="w-3 h-3 rounded-xl bg-[#232323] duration-300 flex items-center leading-2 justify-center translate-x-px"
            >
              <div className="flex items-center h-full text-white -translate-y-0.5">
                {view === "editor" ? "e" : "p"}
              </div>
            </div>
          </div>{" "}
          <div className="w-[100px]">viewing {view}</div>
        </div>
      </div>
    </div>
  );
}

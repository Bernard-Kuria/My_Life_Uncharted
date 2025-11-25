"use client";

import { useEffect, useState } from "react";
import { getAllMilestones } from "@services/milestones";
import type { Milestones } from "@lib/types/types";

export default function Milestones({
  topic = "",
}: {
  topic: string | undefined;
}) {
  const [milestones, setMilestones] = useState<Milestones>();

  useEffect(() => {
    getAllMilestones(topic).then(setMilestones);
  }, []);
  return (
    <div className="w-full grid justify-around min-h-[300px] text-white bg-(--primary-blue) py-[20px]">
      <div className="page-layout grid md:flex gap-[40px] justify-between items-center h-full">
        {!milestones ? (
          <div>Loading Milestones</div>
        ) : (
          milestones?.milestones.map((milestone, idx) => (
            <div key={idx} className="sub-title text-center">
              <div className="values">{milestone.value}</div>
              {milestone.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

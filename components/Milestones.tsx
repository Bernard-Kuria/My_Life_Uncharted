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
    if (topic) {
      getAllMilestones(topic).then(setMilestones);
    }
  }, [topic]);

  return (
    <div className="w-full grid justify-around min-h-[250px] text-white bg-(--primary-blue) py-5">
      <div className="page-layout grid md:flex gap-10 justify-between h-full">
        {!milestones ? (
          <div>Loading Milestones</div>
        ) : (
          milestones?.milestones.map((milestone, idx) => (
            <div key={idx} className="sub-title text-center">
              <div className="values min-h-[120px]">{milestone.value}</div>
              {milestone.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

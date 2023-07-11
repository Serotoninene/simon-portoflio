"use client";

import React, { useRef } from "react";
import { Caption } from "@/types";

import { useInView } from "framer-motion";
import { AnimatedWords } from "./AnimWords";

export const PhotoCaption = ({
  idx = "01",
  title = "MY GARDEN IS COOL",
  place = "Canary Islands (ES)",
  date = "2021",
}: Caption) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-between sm:justify-start gap-2">
      <h3 className="font-bold text-5xl sm:text-6xl">{idx.padStart(2, "0")}</h3>
      <div className="flex flex-col justify-between pt-0.5 whitespace-nowrap overflow-hidden">
        <h4 className="text-lg text-end sm:text-start sm:text-xl text-ellipsis overflow-hidden">
          <AnimatedWords string={title} start={isInView} />
        </h4>
        <p className="pb-0.5 text-end sm:text-start text-ellipsis overflow-hidden">
          {date}, {place}.
        </p>
      </div>
    </div>
  );
};

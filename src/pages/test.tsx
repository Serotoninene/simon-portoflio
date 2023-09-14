import React from "react";

import { interpolate } from "@siluat/flubber";

import { rectangle, gridRectangle } from "@/components/work/SVGButtons/paths";
import {
  useMotionValue,
  motion,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";

type Props = {
  progress: MotionValue;
  paths: string[];
};

export const SVGMorph = ({ progress, paths }: Props) => {
  const pathsIndexes = paths.map((_: string, idx: number) => idx);

  const path = useTransform(progress, pathsIndexes, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });

  return <motion.path d={path} />;
};

export default function Test(props: Props) {
  const progress = useMotionValue(0);

  const handleMouseEnter = () => {
    animate(progress, 0.999, {
      duration: 0.2,
      ease: "easeOut",
    });
  };

  const handleMouseLeave = () => {
    animate(progress, 0, {
      duration: 0.2,
      ease: "easeOut",
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[24px]">
        <svg
          id="Calque_1"
          data-name="Calque 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {rectangle.map((path, idx) => (
            <SVGMorph
              key={path}
              progress={progress}
              paths={[rectangle[idx], gridRectangle[idx], rectangle[idx]]}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

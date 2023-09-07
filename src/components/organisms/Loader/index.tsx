import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { useLoadingContext } from "@/context/LoadingContext";
import { loadingPath } from "./paths";

const draw = {
  hidden: { opacity: 0, strokeDashOffset: 0 },
  visible: {
    strokeDashoffset: 200,
    opacity: 1,

    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};
export const Loader = () => {
  const { isLoaded } = useLoadingContext();
  const { scroll } = useLocomotiveScroll();
  !isLoaded && scroll?.stop();

  useEffect(() => {
    if (isLoaded) {
      scroll?.start();
    }
  }, [isLoaded]);

  if (isLoaded) return null;

  return (
    <div className="h-[var(--fullScreen)] w-screen flex justify-center items-center fixed top-0 left-0 bg-light z-20 overflow-hidden text-3xl font-black">
      <svg
        viewBox="0 0 56 10" // Set the viewBox to match the original dimensions
        width="50vw"
      >
        <defs>
          {loadingPath.map((letter, idx) => (
            <clipPath key={letter} id={`clip-path${idx}`} d={letter}>
              <path d={letter} fill="none" />
            </clipPath>
          ))}
        </defs>

        {loadingPath.map((letter, idx) => (
          <motion.path
            key={`${letter}path`}
            clip-path={`url(#clip-path${idx})`}
            initial={{
              pathLength: 0,
              pathOffset: 0.1,
              opacity: 0,
            }}
            animate={{
              pathLength: [0, 1, 0],
              strokeWidth: [1, 6, 1],
              pathOffset: [0.1, 0, 0.1],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 0.5 + idx * 0.1,
              ease: "easeInOut",

              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            d={letter}
            id={"path" + idx}
            stroke="#071732"
            strokeWidth={0}
            strokeLinejoin={"round"}
            strokeLinecap={"round"}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};

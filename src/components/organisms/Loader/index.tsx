import React, { useEffect, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { useLoadingContext } from "@/context/LoadingContext";
import { loadingPath } from "./paths";

const containerAnim = {
  exit: {
    y: "100%",
    transition: {
      delay: 0.7,
      ease: "easeOut",
    },
  },
};

const drawAnimation: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number) => ({
    pathLength: [0, 1, 0],
    strokeWidth: [1, 50, 0],
    pathOffset: [0.1, 0, 0.1],
    opacity: [0, 1, 0],
    transition: {
      delay: 0.5 + custom * 0.1,
      ease: "easeInOut",
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
    },
  }),

  exit: (custom: number) => ({
    y: "200%",
    transition: {
      delay: custom * 0.02,
      ease: "easeIn",
      duration: 0.5,
    },
  }),
};

export const Loader = () => {
  const { scroll } = useLocomotiveScroll();
  const { isLoaded } = useLoadingContext();
  const [isExitAnimationComplete, setIsExitAnimationComplete] = useState(false);

  !isLoaded && scroll?.stop();
  useEffect(() => {
    if (isLoaded) {
      scroll?.start();
    }
  }, [isLoaded]);

  const unMountAfterExitAnim = () => {
    setIsExitAnimationComplete(true);
  };

  // if the exit animation is complete or if the loading has already been done, return null
  // if (isExitAnimationComplete || isLoaded) return null;

  return (
    <AnimatePresence mode="wait">
      {isExitAnimationComplete || isLoaded ? null : (
        <motion.div
          variants={containerAnim}
          exit="exit"
          onAnimationComplete={unMountAfterExitAnim}
          key={isLoaded.toString()}
          className="h-[var(--fullScreen)]  w-screen flex justify-center items-center fixed top-0 left-0 bg-light z-20 overflow-hidden text-3xl font-black"
        >
          <svg
            viewBox="0 0 56 10" // Set the viewBox to match the original dimensions
            width="20vw"
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
                clipPath={`url(#clip-path${idx})`}
                variants={drawAnimation}
                custom={idx}
                initial="hidden"
                animate="visible"
                exit="exit"
                d={letter}
                id={"path" + idx}
                stroke="#071732"
                strokeLinejoin={"round"}
                strokeLinecap={"round"}
                fill="none"
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { useLoadingContext } from "@/context/LoadingContext";
import { loadingPath } from "./paths";

const drawAnimation = {
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
};

export const Loader = () => {
  const { isLoaded } = useLoadingContext();
  const [isLoaderShown, setIsLoaderShown] = useState(true);
  const { scroll } = useLocomotiveScroll();
  !isLoaded && scroll?.stop();

  useEffect(() => {
    if (isLoaded) {
      scroll?.start();
    }
  }, [isLoaded]);

  // if (!isLoaderShown) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        exit={{ y: "100vh" }}
        onAnimationComplete={() => {
          console.log();
        }}
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
    </AnimatePresence>
  );
};

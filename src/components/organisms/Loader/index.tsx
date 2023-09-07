import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { useLoadingContext } from "@/context/LoadingContext";
import { loadingPath } from "./paths";
import { containerAnim, drawAnimation } from "./anims";

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
        <div key={isLoaded.toString()}>
          <motion.div
            variants={containerAnim}
            exit="exit"
            onAnimationComplete={unMountAfterExitAnim}
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
        </div>
      )}
    </AnimatePresence>
  );
};

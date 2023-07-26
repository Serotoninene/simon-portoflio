"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import barba from "@barba/core";
import { useEffect } from "react";
import { gsap } from "gsap";

type AnimateProps = {
  children: React.ReactNode;
};

// export const AnimateContainer = ({ children }: AnimateProps) => {
//   const path = usePathname();
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         initial={{ x: "-100vw" }}
//         animate={{ x: 0 }}
//         transition={{ ease: "linear", delay: 0.5 }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

export const AnimateContainer = ({ children }: AnimateProps) => {
  const PageTransition = {
    async leave() {
      // Code to animate the leaving page, e.g., fading out
      gsap.to("#body", { duration: 0.5, opacity: 0 });
    },

    async enter() {
      // Code to animate the entering page, e.g., fading in
      gsap.to("#body", { duration: 1, opacity: 0 });

      console.log("Entering page...");
    },
  };

  useEffect(() => {
    if (!barba) return;

    barba.init({
      transitions: [PageTransition],
      debug: true,
    });

    return () => {
      barba.destroy();
    };
  }, [barba]);

  return (
    <div data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
};

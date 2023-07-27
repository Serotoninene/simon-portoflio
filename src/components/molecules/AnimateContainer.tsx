"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  return (
    <div data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
};

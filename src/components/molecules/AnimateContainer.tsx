"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type AnimateProps = {
  children: React.ReactNode;
};

export const AnimateContainer = ({ children }: AnimateProps) => {
  const path = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={path}>{children}</motion.div>
    </AnimatePresence>
  );
};

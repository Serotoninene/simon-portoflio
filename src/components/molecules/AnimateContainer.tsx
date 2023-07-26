"use client";

import { AnimatePresence } from "framer-motion";

type AnimateProps = {
  children: React.ReactNode;
};

export const AnimateContainer = ({ children }: AnimateProps) => {
  return (
    <AnimatePresence mode="wait">
      <div>{children}</div>
    </AnimatePresence>
  );
};

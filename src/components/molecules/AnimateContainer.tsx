"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type AnimateProps = {
  children: React.ReactNode;
};

export const AnimateContainer = ({ children }: AnimateProps) => {
  return (
    <div data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
};

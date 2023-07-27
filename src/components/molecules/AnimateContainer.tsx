"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useEffect } from "react";

type AnimateProps = {
  children: React.ReactNode;
};

export const AnimateContainer = ({ children }: AnimateProps) => {
  const path = usePathname();
  return <div key={path}>{children}</div>;
};

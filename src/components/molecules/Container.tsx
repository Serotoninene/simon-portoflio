import { AnimatePresence } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type HomeContainerProps = {
  children: React.ReactNode;
  fit?: boolean;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div
      // data-scroll-section
      className={`px-5 min-w-[100dvw] sm:px-10 ${className}`}
    >
      {children}
    </div>
  );
};

export const HomeContainer = ({ children, fit }: HomeContainerProps) => (
  <div className={`py-6 ${fit ? "h-auto" : "h-[var(--screen)]"}`}>
    {children}
  </div>
);

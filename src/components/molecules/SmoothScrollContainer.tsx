"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export const SmoothScrollContainer = ({ children }: Props) => {
  const path = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        multiplier: 0.5,
      }}
      watch={[path]}
    >
      <div data-scroll-container ref={containerRef} className="fixed">
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

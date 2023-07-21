"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { Scroll } from "react-locomotive-scroll";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { Container } from "./Container";

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
        inertia: 0.8,
        mobile: {
          breakpoint: 0,
          smooth: true,
          multiplier: 15,
          class: "is-reveal",
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
        },
      }}
      watch={[path]}
      location={path}
      onLocationChange={(scroll: Scroll) => {
        scroll.scrollTo(0, { duration: 0, disableLerp: true });
      }}
    >
      <div
        id="scroll-container"
        data-scroll-container
        ref={containerRef}
        className="fixed"
      >
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
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
      }}
      watch={[path]}
      location={path}
      onLocationChange={(scroll: any) =>
        scroll.scrollTo(0, { duration: 0, disableLerp: true })
      } // If you want to reset the scroll position to 0 for example
    >
      <div
        id="scroll-container"
        data-scroll-container
        ref={containerRef}
        className="fixed"
      >
        <Container className="pt-8">{children}</Container>
      </div>
    </LocomotiveScrollProvider>
  );
};

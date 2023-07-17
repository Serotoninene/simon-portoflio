"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

type Props = {
  children: React.ReactNode;
};

export const SmoothScrollContainer = ({ children }: Props) => {
  const path = usePathname();
  console.log(path);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        multiplier: 0.5,
        inertia: 0.8,
      }}
      watch={[path]}
      location={path}
      onLocationChange={(scroll: any) =>
        scroll.scrollTo(0, { duration: 0, disableLerp: true })
      } // If you want to reset the scroll position to 0 for example
    >
      <div data-scroll-container ref={containerRef} className="fixed">
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

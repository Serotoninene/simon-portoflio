import React, { RefObject, use, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

import { useWindowSize } from "@/utils/hooks";
import { useLoadingContext } from "@/context/LoadingContext";

type Props = {
  children: React.ReactNode;
};

export const LocomotiveScrollContainer = ({ children }: Props) => {
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
          multiplier: 5,
          class: "is-reveal",
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
        },
        multiplier: 0.75,
      }}
      watch={[path]}
      location={path}
    >
      <div
        id="scroll-container"
        data-scroll-container
        ref={containerRef}
        className="fixed top-0 left-0 bg-light w-full"
      >
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

export default function FramerSmoothScroll({ children }: Props) {
  const { width } = useWindowSize();
  const scrollContainer = useRef() as RefObject<HTMLDivElement>;
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // added a setTimeout so the page has the time to load and it still fits
      const scrollContainerSize =
        scrollContainer.current?.getBoundingClientRect();

      scrollContainerSize && setPageHeight(scrollContainerSize.height);
    }, 500);
  }, [width]);

  const { scrollY } = useScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.17, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <motion.div
        ref={scrollContainer}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="app fixed overflow-hidden w-screen"
      >
        {children}
      </motion.div>
      <motion.div style={{ height: pageHeight }} />
    </>
  );
}

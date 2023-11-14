"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { createAlt, getAspectRatio } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/utils/hooks";

type Props = {
  src: string;
  aspectRatio: number;
  alt?: string;
  mobileSrc?: string;
  dominantColor?: string;
};

export const AnimPhoto = ({ alt, src, dominantColor, mobileSrc }: Props) => {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  const [isLoaded, setIsLoaded] = useState(false);

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: isMobile ? mobileSrc : src,
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = dominantColor ?? "#000000";
    }
  }, [ref.current, isLoaded]);

  return (
    <AnimatePresence mode="wait">
      <div
        ref={ref}
        key={path}
        className={`h-full flex justify-center items-center relative overflow-hidden sm:h-full sm:block`}
      >
        <motion.div
          exit={{ y: "100%" }}
          transition={{
            ease: "easeOut",
          }}
          data-scroll
          data-scroll-speed="-0.5"
          className="relative h-full"
        >
          <Image
            onLoad={handleLoad}
            fill
            {...imageProps}
            className={`transition-opacity duration-1000 scale-105 object-cover ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

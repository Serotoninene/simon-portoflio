"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { createAlt, getAspectRatio } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/utils/hooks";

type Props = {
  alt?: string;
  src: string;
  dominantColor?: string;
  aspectRatio: number;
};

export const AnimPhoto = ({ alt, src, dominantColor }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const path = usePathname();

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src ?? "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
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
      <div ref={ref} key={path} className="h-full relative overflow-hidden">
        <motion.div
          exit={{ y: "100%" }}
          transition={{
            ease: "easeOut",
          }}
          data-scroll
          data-scroll-speed="-0.5"
          className="relative h-full translate-y-10"
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

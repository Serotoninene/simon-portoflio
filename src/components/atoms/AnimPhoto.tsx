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
  dominantColor?: string;
};

export const AnimPhoto = ({ alt, src, dominantColor, aspectRatio }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const [isLoaded, setIsLoaded] = useState(false);
  // if true the photo is taller than it is wide
  const portraitAspect = aspectRatio < 1;

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
      <div
        ref={ref}
        key={path}
        className={`${
          portraitAspect ? "h-[80vh]" : "h-[50vh]"
        } sm:h-full relative overflow-hidden`}
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

"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { createAlt } from "@/utils/helpers";
import { ease } from "@/utils/store";
import { usePathname } from "next/navigation";

type Props = {
  alt?: string;
  src: string;
  dominantColor?: string;
  fit?: "cover" | "contain";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

const variants = {
  hidden: { scale: 1, y: "100%" },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      ease: ease,
      duration: 1.5,
    },
  },
};

export const AnimPhoto = ({
  alt,
  src,
  dominantColor,
  fit = "cover",
  placeholder = "blur",
  blurDataURL = src,
  sizes,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const path = usePathname();

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src ?? "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
    sizes: sizes,
    className: `object-${fit || "cover"}`,
    placeholder: placeholder,
    blurDataURL: blurDataURL ?? src,
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = dominantColor ?? "#000000";

      if (isLoaded) {
        ref.current.style.backgroundColor = "transparent";
      }
    }
  }, [ref.current, isLoaded]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        ref={ref}
        exit={{ x: "100%" }}
        className="h-full relative overflow-hidden "
      >
        <div
          data-scroll
          data-scroll-speed="-1.1"
          className="relative h-full translate-y-10"
        >
          {/* eslint-disable-next-line */}
          <Image
            onLoad={handleLoad}
            fill
            {...imageProps}
            className={`transition-opacity duration-1000 object-cover ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ColorThief from "colorthief";

import { createAlt, rgbToHex } from "@/utils/helpers";
import { ease } from "@/utils/store";

type Props = {
  alt?: string;
  src: string;
  fit?: "cover" | "contain";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

const variants = {
  hidden: { scale: 1 },
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
  fit = "cover",
  placeholder = "blur",
  blurDataURL = src,
  sizes,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dominantColor, setDominantColor] = useState("");

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src ?? "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
    sizes: sizes,
    className: `object-${fit || "cover"}`,
    placeholder: placeholder,
    blurDataURL: blurDataURL,
  };

  const handleLoad = () => {
    if (!ref.current) return;

    const img = ref.current.querySelector("img");
    if (!img) return;

    const colorThief = new ColorThief();
    const color = colorThief.getColor(img);
    setDominantColor(rgbToHex(color));
  };

  return (
    <div ref={ref} className="h-full relative overflow-hidden bg-red-400">
      <div
        data-scroll
        data-scroll-speed="-1.5"
        className="relative h-full translate-y-10"
      >
        {/* eslint-disable-next-line */}
        <Image
          onLoad={handleLoad}
          fill
          {...imageProps}
          placeholder="blur"
          blurDataURL={src}
        />
      </div>
    </div>
  );
};

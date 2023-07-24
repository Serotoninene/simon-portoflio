"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { createAlt } from "@/utils/helpers";
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
  placeholder = "empty",
  blurDataURL,
  sizes,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src ?? "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
    sizes: sizes,
    className: `object-${fit || "cover"}`,
    placeholder: placeholder,
    blurDataURL: blurDataURL,
  };

  return (
    <div ref={ref} className="h-full relative overflow-hidden">
      <div
        data-scroll
        data-scroll-speed="-1.5"
        className="relative h-full translate-y-10"
      >
        {/* eslint-disable-next-line */}
        <Image fill {...imageProps} />
      </div>
    </div>
  );
};

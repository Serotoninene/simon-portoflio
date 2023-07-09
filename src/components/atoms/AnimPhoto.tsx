"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: true });

  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src,
    sizes: sizes,
    className: `object-${fit || "cover"}`,
    placeholder: placeholder,
    blurDataURL: blurDataURL,
  };

  return (
    <div ref={ref} className="h-full relative overflow-hidden">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 1, ease: "easeOut", duration: 0.6 }}
        className="relative h-full translate-y-10"
      >
        {/* eslint-disable-next-line */}
        <Image fill {...imageProps} />
      </motion.div>
    </div>
  );
};

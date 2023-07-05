import React from "react";
import Image from "next/image";
import { createAlt } from "@/utils/helpers";

type Props = {
  alt?: string;
  src: string;
  fit?: "cover" | "contain";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

export const AnimPhoto = ({
  alt,
  src,
  fit = "cover",
  placeholder = "empty",
  blurDataURL,
  sizes,
}: Props) => {
  const imageProps = {
    alt: alt ?? createAlt(src),
    src: src,
    sizes: sizes,
    className: `object-${fit || "cover"}`,
    placeholder: placeholder,
    blurDataURL: blurDataURL,
  };

  return (
    <div className="h-full relative">
      {/* eslint-disable-next-line */}
      <Image fill {...imageProps} />
    </div>
  );
};

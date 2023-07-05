import Image from "next/image";
import React from "react";

type Props = {
  alt?: string;
  src: string;
  fit?: "cover" | "contain";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

export const AnimPhoto = ({
  alt = "Phtoo",
  src,
  fit = "cover",
  placeholder = "empty",
  blurDataURL,
  sizes,
}: Props) => {
  const imageProps = {
    alt: alt,
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

import Image from "next/image";
import React from "react";

type Props = {
  alt: string;
  src: string;
  fit?: "cover" | "contain";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

export const AnimPhoto = (props: Props) => {
  const imageProps = {
    alt: props.alt,
    src: props.src,
    sizes: props.sizes,
    className: `object-${props.fit || "cover"}`,
    placeholder: props.placeholder,
    blurDataURL: props.blurDataURL,
  };

  return (
    <div className="h-full relative">
      {/* eslint-disable-next-line */}
      <Image fill {...imageProps} />
    </div>
  );
};

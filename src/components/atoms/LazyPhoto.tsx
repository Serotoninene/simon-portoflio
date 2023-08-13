import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  priority?: boolean;
  alt?: string;
  src: string;
  dominantColor?: string;
  fit?: "cover" | "contain";
};

export const LazyPhoto = ({
  alt,
  src,
  priority,
  fit,
  dominantColor,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageProps = {
    alt: alt || "photo",
    src,
    priority,
    className: `object-${fit || "cover"}`,
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = dominantColor ?? "#000000";
    }
  }, [ref.current, isLoaded]);

  return (
    <div ref={ref}>
      {/* eslint-disable-next-line */}
      <Image
        fill
        {...imageProps}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-1000 scale-105 object-contain ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

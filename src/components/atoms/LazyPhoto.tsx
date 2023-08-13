import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  priority?: boolean;
  alt?: string;
  src: string;
  aspectRatio?: string;
  dominantColor?: string;
  fit?: "cover" | "contain";
};

export const LazyPhoto = ({
  alt,
  src,
  fit,
  priority,
  aspectRatio,
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

      if (aspectRatio > 1) {
        ref.current.style.paddingBottom = `${aspectRatio * 100}%`;
      } else {
        ref.current.style.paddingBottom = `${100 / aspectRatio}%`;
      }
    }
  }, [ref.current, isLoaded]);

  return (
    <div ref={ref} className="h-full">
      {/* eslint-disable-next-line */}
      <Image
        fill
        {...imageProps}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-1000 object-contain ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

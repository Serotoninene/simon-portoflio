import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOverviewContext } from "../context/OverviewContext";

type Props = {
  priority?: boolean;
  alt?: string;
  src: string;
  aspectRatio?: number;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOverview } = useOverviewContext();

  const imageProps = {
    alt: alt || "photo",
    src,
    priority,
    className: `object-${fit || "cover"}`,
  };

  useEffect(() => {
    if (ref.current) {
      isLoaded
        ? (ref.current.style.backgroundColor = "transparent")
        : (ref.current.style.backgroundColor = dominantColor ?? "#000000");
      if (!aspectRatio) return;
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      if (aspectRatio > 1) {
        ref.current.style.height =
          Math.min(bounds.width / aspectRatio, bounds.height) + "px";
        ref.current.style.width =
          Math.min(bounds.width, bounds.height * aspectRatio) + "px";
      } else {
        ref.current.style.width = bounds.height * aspectRatio + 5 + "px";
        ref.current.style.margin = "0 auto";
      }
    }
  }, [isOverview, isLoaded]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full  flex justify-center items-center"
    >
      <div
        ref={ref}
        style={{ position: "relative" }}
        className={`lazy-container h-full relative`}
      >
        {/* eslint-disable-next-line */}
        <Image
          fill
          {...imageProps}
          onLoad={() => setIsLoaded(true)}
          className={`lazy-photo transition-opacity duration-1000 object-contain  ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

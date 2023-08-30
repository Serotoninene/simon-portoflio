import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOverviewContext } from "../context/OverviewContext";
import { useWindowSize } from "@/utils/hooks";
import { useLocomotiveScroll } from "react-locomotive-scroll";

type Props = {
  priority?: boolean;
  alt?: string;
  src: string;
  aspectRatio?: number;
  dominantColor?: string;
};

export const LazyPhoto = ({
  alt,
  src,
  priority,
  aspectRatio,
  dominantColor,
}: Props) => {
  const { scroll } = useLocomotiveScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOverview } = useOverviewContext();
  const { width, height } = useWindowSize();

  const imageProps = {
    alt: alt || "photo",
    src,
    priority,
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = dominantColor ?? "#000000";
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
  }, [isOverview, isLoaded, width, height]);

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
          onLoad={() => {
            setIsLoaded(true);
            if (!scroll) {
              scroll.update();
            }
          }}
          className={`lazy-photo transition-opacity duration-1000 object-cover  ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

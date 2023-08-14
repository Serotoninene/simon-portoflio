import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";

import { ExtendedPhoto } from "@/types";
import { hexToRgb, rgbDataURL } from "@/utils/colors";
import { AnimPhoto, LazyPhoto } from "../atoms";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Power3 } from "gsap";

type Props = {
  idx: number;
  photo: ExtendedPhoto;
  setPhotoTarget: (id: string) => void;
};

export const Photo = ({ idx, photo, setPhotoTarget }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setCursorType } = useCursorContext();
  const { isOverview, handleOverviewSwitch } = useOverviewContext();

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    handleOverviewSwitch(false); // <- don't believe what VSC tells u, if u remove the await the smooth scroll won't work
    setPhotoTarget(photo.alt);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!photo.dominantColor) {
      return;
    }
  }, []);

  if (isOverview)
    return (
      <div
        id={photo.alt}
        data-flip-id={photo.alt}
        className="gallery-photo h-[25vh] relative"
        onMouseEnter={() => {
          setCursorType("hover");
        }}
        onMouseLeave={() => {
          setCursorType("pointer");
        }}
        onClick={handleClick}
      >
        <LazyPhoto
          priority={idx < 9}
          src={photo.src}
          alt={photo.alt}
          aspectRatio={photo.aspectRatio}
          dominantColor={photo.dominantColor}
        />
      </div>
    );

  return (
    <div
      id={photo.alt}
      ref={ref}
      data-flip-id={photo.alt}
      className="gallery-photo h-[calc(100vh-32px)] my-4 relative"
    >
      <LazyPhoto
        priority={idx < 9}
        src={photo.src}
        alt={photo.alt}
        aspectRatio={photo.aspectRatio}
        dominantColor={photo.dominantColor}
      />
    </div>
  );
};

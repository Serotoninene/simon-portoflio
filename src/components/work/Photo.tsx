import { ExtendedPhoto } from "@/types";
import { loadImage, rgbToHex } from "@/utils/helpers";
import { useWindowSize } from "@/utils/hooks";
import ColorThief from "colorthief";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";

type Props = {
  photo: ExtendedPhoto;
};

export const Photo = ({ photo }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { cursorType, setCursorType } = useCursorContext();
  const { isOverview, setIsOverview } = useOverviewContext();
  const { width } = useWindowSize();

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    await setIsOverview(false); // <- don't believe what VSC tells u, if u remove the await the smooth scroll won't work
    if (!width) return;
    const { top } = ref.current?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({
      top: top + window.scrollY,
      behavior: "smooth",
    });
  };

  if (isOverview)
    return (
      <div
        ref={ref}
        className="h-[25vh] relative"
        onMouseEnter={() => {
          setCursorType("hover");
        }}
        onMouseLeave={() => {
          setCursorType("pointer");
        }}
        onClick={handleClick}
      >
        <Image
          id={photo.alt}
          alt={photo.alt}
          placeholder="blur"
          blurDataURL={photo.src}
          src={photo.src}
          fill
          className="object-cover"
        />
      </div>
    );

  return (
    <motion.div
      ref={ref}
      className={`${
        !isOverview ? "h-[calc(100vh-32px)] my-4" : "h-[25vh]"
      }  relative
         `}
    >
      <Image
        id={photo.alt}
        alt={photo.alt}
        placeholder="blur"
        blurDataURL={photo.src}
        fill
        src={photo.src}
        className={`object-center opacity-10 ${
          isOverview ? "object-cover" : "object-contain"
        }`}
      />
    </motion.div>
  );
};

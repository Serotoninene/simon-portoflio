import { ExtendedPhoto } from "@/types";
import { useWindowSize } from "@/utils/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";

type Props = { photo: ExtendedPhoto; setPhotoTarget: (id: string) => void };

export const Photo = ({ photo, setPhotoTarget }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setCursorType } = useCursorContext();
  const { isOverview, handleOverviewSwitch } = useOverviewContext();

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    handleOverviewSwitch(false); // <- don't believe what VSC tells u, if u remove the await the smooth scroll won't work
    setPhotoTarget(photo.alt);
  };

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
        <Image
          id={photo.alt}
          src={photo.src}
          alt={photo.alt}
          placeholder="blur"
          blurDataURL={photo.src}
          className="object-contain"
          fill
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
      <Image
        id={photo.alt}
        src={photo.src}
        alt={photo.alt}
        placeholder="blur"
        blurDataURL={photo.src}
        className="object-center object-contain"
        fill
      />
    </div>
  );
};

import { ExtendedPhoto } from "@/types";
import { useWindowSize } from "@/utils/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";

type Props = {
  photo: ExtendedPhoto;
};

export const Photo = ({ photo }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setCursorType } = useCursorContext();
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
          src={photo.src}
          alt={photo.alt}
          placeholder="blur"
          blurDataURL={photo.src}
          className="object-cover"
          fill
        />
      </div>
    );

  return (
    <motion.div ref={ref} className="h-[calc(100vh-32px)] my-4 relative">
      <Image
        id={photo.alt}
        src={photo.src}
        alt={photo.alt}
        placeholder="blur"
        blurDataURL={photo.src}
        className="object-center object-contain"
        fill
      />
    </motion.div>
  );
};

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
  const { isOverview, setIsOverview } = useOverviewContext();
  const { setCursorType } = useCursorContext();

  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [dominantColor, setDominantColor] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // know the aspect ratio of the photo
  const [aspectRatio, setAspectRatio] = useState(1);

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

  useEffect(() => {
    if (childRef.current) {
      childRef.current.style.backgroundColor = photo.dominantColor ?? "#071732";
    }
  }, [childRef.current, dominantColor]);

  useEffect(() => {
    if (!width || !height) return;
    const img = loadImage(photo.src);

    img.src = photo.src;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };

    const windowAspectRatio = width / height;

    setImageSize({
      width:
        aspectRatio > 1
          ? (width / windowAspectRatio) * aspectRatio - 48
          : height * aspectRatio - 32,
      height: 400,
    });
  }, [photo.src, width, height, aspectRatio]);

  if (!width || !height) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        layout
        data-scroll
        data-scroll-to
        key={path}
        className={`${
          !isOverview
            ? "h-[100vh] py-4 items-center"
            : "h-[25vh] cursor-pointer items-start"
        } w-full flex flex-col flex-none justify-center relative pointer-events-auto
         `}
        onMouseEnter={() => {
          setCursorType(isOverview ? "hover" : "pointer");
        }}
        onMouseLeave={() => {
          setCursorType("pointer");
        }}
        onClick={handleClick}
      >
        <div ref={childRef} className="opacity-100">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ y: "100%" }}
            transition={{ delay: 0.5, ease: "easeOut" }}
            className=""
          >
            <Image
              id={photo.alt}
              alt={photo.alt}
              width={!isOverview ? imageSize.width : undefined}
              height={!isOverview ? imageSize.height : undefined}
              placeholder="blur"
              blurDataURL={photo.src}
              fill={isOverview}
              src={photo.src}
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

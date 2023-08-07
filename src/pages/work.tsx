"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { createPhotoTitle, loadImage, rgbToHex } from "@/utils/helpers";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import ColorThief from "colorthief";

import { Container } from "@/components/molecules";
import { useWindowSize } from "@/utils/hooks";
import { usePathname } from "next/navigation";

import { CustomCanvas } from "@/components/three";

const Scene = () => {
  return (
    <CustomCanvas>
      <ambientLight intensity={0.5} />
    </CustomCanvas>
  );
};

const Photo = ({ photo, setIsOverview, isOverview }: any) => {
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
    await setIsOverview(false);
    if (!width) return;
    const { top } = ref.current?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({
      top: top + window.scrollY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!dominantColor) return;
    if (childRef.current) {
      childRef.current.style.backgroundColor = dominantColor;
    }
  }, [dominantColor]);

  useEffect(() => {
    if (!width || !height) return;
    const img = loadImage(photo.src);
    const colorThief = new ColorThief();

    img.src = photo.src;
    img.onload = () => {
      const color = colorThief.getColor(img);
      setDominantColor(rgbToHex(color));
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
      <div
        ref={ref}
        data-scroll
        data-scroll-to
        key={path}
        className={`${
          !isOverview
            ? "h-[100vh] py-4 items-center"
            : "h-[50vh] cursor-pointer items-start"
        } w-full flex flex-col flex-none justify-center relative pointer-events-auto `}
        onClick={handleClick}
      >
        <div className="overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ y: "100%" }}
            transition={{ delay: 0.5, ease: "easeOut" }}
            ref={childRef}
          >
            <Image
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
      </div>
    </AnimatePresence>
  );
};

const WorkFooter = ({
  photos,
  idx,
  title,
  variants,
  isOverview,
  handleToggleLayout,
}: any) => {
  return (
    <div
      data-scroll
      data-scroll-sticky
      data-scroll-target="#scroll-container"
      className={`flex items-end fixed left-0 top-0 h-[100vh] py-4 px-10 w-full ${
        isOverview ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <AnimatePresence mode="popLayout">
        <div className="flex justify-between items-center w-full mix-blend-difference">
          <motion.div
            key={title}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="font-bold"
          >
            {title}{" "}
            <span className="text-sm font-normal">{photos[idx]?.date}.</span>
          </motion.div>
          <div className="cursor-pointer" onClick={handleToggleLayout}>
            See all photos
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default function Work() {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");

  const [isOverview, setIsOverview] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  useEffect(() => {
    if (!scrollYProgress) return;
    scrollYProgress.on("change", (e: any) => {
      setIdx(Math.round(e * (photos.length - 1)));
    });
  }, [scrollYProgress]);

  const photos = [
    {
      ...createPhotoTitle("/assets/photos/10_TIME_FOR_LAUNDRY.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/09_SUPERMARKET.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/08_ALL_ABOUT_CLEANING.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/07_SQUARED.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/10_TIME_FOR_LAUNDRY.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/09_SUPERMARKET.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/08_ALL_ABOUT_CLEANING.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/07_SQUARED.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/10_TIME_FOR_LAUNDRY.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/09_SUPERMARKET.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/08_ALL_ABOUT_CLEANING.jpeg"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/07_SQUARED.jpeg"),
      date: "2019, Vancouver (CA)",
    },
  ];

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleToggleLayout = () => {
    setIsOverview((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="pt-0">
      <LayoutGroup>
        <motion.div
          layout
          data-scroll-section
          className={`relative  ${
            isOverview
              ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 h-full gap-2"
              : "flex flex-col gap-6 sm:gap-8 md:gap-[50vh]"
          } w-full`}
        >
          {photos.map((photo, idx) => (
            <motion.div
              layout
              initial={{ y: "50%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.005 * idx, ease: "easeOut" }}
              key={idx}
              className={`flex-none opacity-10 ${
                isOverview ? "flex h-full overflow-hidden " : ""
              }`}
            >
              <Photo
                photo={photo}
                isOverview={isOverview}
                setIsOverview={setIsOverview}
              />
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>

      <WorkFooter
        photos={photos}
        title={title}
        idx={idx}
        variants={variants}
        isOverview={isOverview}
        handleToggleLayout={handleToggleLayout}
      />
    </Container>
  );
}

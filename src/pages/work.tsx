"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { createPhotoTitle, loadImage, rgbToHex } from "@/utils/helpers";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import ColorThief from "colorthief";

import { Container } from "@/components/molecules";
import { useWindowSize } from "@/utils/hooks";
import { usePathname } from "next/navigation";

// use Image but rename it NextImage

// TO DO
// [X] Make a "menu" layout to see all the images at once on click of a button
// [X] onClick of one photo, back to the usual layout and scroll to the photo
// [X] do the transition between the two layouts
// [X] when overlay mode -> scroll to 0
// [X] click to a photo -> scroll to the photo
// [X] Insert all the photos on the homepage
// [X] only smoothscroll on the home for now
// [X] stick the footer properly ...
// [X] make the footer change with the scroll
// [X] replace all the img by Image on work page
// [X] Make the photos lazy load
// [X] make a menu for mobile
// [X] make the text appear on scroll
// [] make an intro animation
// [] rearrange the layout on mobile
// [X] remove the number from the title + capitalize the first letter (on work page)
// [] make the title blend mode (on work page)
// [] make a custom cursor

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
    const { top } = ref.current?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({ top, behavior: "smooth" });
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
            ? "h-[100dvh] py-4 items-center"
            : "h-full cursor-pointer items-start"
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
              width={imageSize.width}
              height={imageSize.height}
              placeholder="blur"
              blurDataURL={photo.src}
              src={photo.src}
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
      className={`flex items-end fixed left-0 top-0 h-[100dvh] py-4 px-10 w-full ${
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
      <div
        data-scroll-section
        className={`relative  ${
          isOverview
            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 h-full gap-2"
            : "flex flex-col gap-6 sm:gap-8 md:gap-10"
        } w-full`}
      >
        <LayoutGroup>
          {photos.map((photo, idx) => (
            <motion.div
              layout
              initial={{ y: "50%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.005 * idx, ease: "easeOut" }}
              key={idx}
              className={`flex-none ${
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
        </LayoutGroup>
      </div>

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

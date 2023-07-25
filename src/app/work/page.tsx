"use client";

import React, { useEffect, useRef, useState } from "react";

import { createPhotoTitle, loadImage } from "@/utils/helpers";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Scroll } from "react-locomotive-scroll";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import { Container, SmoothScrollContainer } from "@/components/molecules";
import { useWindowSize } from "@/utils/hooks";
// use Image but rename it NextImage
import Image from "next/image";

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
// [] Make the photos lazy load
// [] make a menu for mobile
// [] make the text appear on scroll
// [] make an intro animation
// [] rearrange the layout on mobile
// [] remove the number from the title + capitalize the first letter (on work page)
// [] make the title blend mode (on work page)
// [] make a custom cursor

const Photo = ({ photo, setIsOverview, isOverview }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  // know the aspect ratio of the photo
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    await setIsOverview(false);
    const { top } = ref.current?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const img = loadImage(photo.src);
    img.src = photo.src;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [photo.src, width, height]);

  if (!width || !height) return null;

  return (
    <div
      ref={ref}
      data-scroll
      data-scroll-to
      className={`${
        !isOverview
          ? "h-[100dvh] py-4 items-center"
          : "h-[64px] cursor-pointer items-start "
      } w-full flex flex-col flex-none justify-center relative  pointer-events-auto`}
      onClick={handleClick}
    >
      <Image
        alt={photo.alt}
        width={aspectRatio > 1 ? width : height * aspectRatio - 32}
        height={aspectRatio > 1 ? 0 : height}
        src={photo.src}
        className=" object-contain object-center"
      />
    </div>
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
        <div className="flex justify-between items-center w-full">
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
  }, [scrollY]);

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

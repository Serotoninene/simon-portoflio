"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPhotoTitle } from "@/utils/helpers";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Scroll } from "react-locomotive-scroll";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Container } from "@/components/molecules";

// TO DO
// [] Make a "menu" layout to see all the images at once on click of a button
// [] onClick of one photo, back to the usual layout and scroll to the photo
// [X] do the transition between the two layouts
// [X] when overlay mode -> scroll to 0
// [] click to a photo -> scroll to the photo

const Photo = ({ photo, setIsOverview, isOverview }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scroll } = useLocomotiveScroll();

  // know the aspect ratio of the photo
  const [aspectRatio, setAspectRatio] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    await setIsOverview(false);
    scroll.update();
    scroll.scrollTo(ref.current, {
      duration: 10,
    });
  };

  useEffect(() => {
    const img = new Image();
    img.src = photo.src;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [photo.src]);

  return (
    <div
      ref={ref}
      data-scroll
      data-scroll-to
      className={`${
        !isOverview ? "h-[100dvh] py-4" : "h-52 cursor-pointer"
      } w-full flex flex-none justify-center items-center pointer-events-auto`}
      onClick={handleClick}
    >
      <img
        alt={photo.alt}
        src={photo.src}
        className="object-fit max-h-full max-w-full"
      />
    </div>
  );
};

export default function Work() {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");
  const [scrollToElement, setScrollToElement] = useState<HTMLDivElement | null>(
    null
  );
  const [isOverview, setIsOverview] = useState(false);
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  useEffect(() => {
    if (!scroll) return;

    scroll.on("scroll", (e: Scroll) => {
      const { scroll, limit } = e;
      console.log(isOverview ? "overview" : "not overview");
      console.log("scroll limit :", limit.y);
      setIdx(Math.round((scroll?.y / limit.y) * (photos.length - 1)));
    });
  }, [scroll]);

  // I need to keep the same height even when i go to the overlay state
  // Only change it when i change the widht of the page but that is way too complicated isn't it ?

  const photos = [
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
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
    scroll.update();
    scroll.scrollTo("top", { duration: 0.05 });
  };

  return (
    <Container>
      <div
        className={`relative flex ${
          isOverview ? "items-center flex-wrap h-full" : "flex-col"
        } gap-6 w-full`}
      >
        <LayoutGroup>
          {photos.map((photo, idx) => (
            <motion.div
              layout
              layoutId={idx.toString()}
              transition={{ delay: 0.01 * idx, duration: 0.3, ease: "easeOut" }}
              key={idx}
              className={`flex-none ${isOverview ? "h-full" : ""}`}
            >
              <Photo
                photo={photo}
                isOverview={isOverview}
                setIsOverview={setIsOverview}
                setScrollToElement={setScrollToElement}
              />
            </motion.div>
          ))}
        </LayoutGroup>
      </div>

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
    </Container>
  );
}

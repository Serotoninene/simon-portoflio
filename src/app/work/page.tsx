"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPhotoTitle } from "@/utils/helpers";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Scroll } from "react-locomotive-scroll";
import { v4 as uuid } from "uuid";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Container } from "@/components/molecules";

// TO DO
// [] Make a "menu" layout to see all the images at once on click of a button
// [] onClick of one photo, back to the usual layout and scroll to the photo
// [X] do the transition between the two layouts
// [X] when overlay mode -> scroll to 0
// [] click to a photo -> scroll to the photo

const Photo = ({ photo, setIsOverview, isOverview, scroll }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOverview) return;

    setIsOverview(false);
    scroll.scrollTo(1500, { duration: 0.05 });
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
  const [isOverview, setIsOverview] = useState(false);
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  useEffect(() => {
    if (!scroll) return;

    scroll.on("scroll", (e: Scroll) => {
      const { scroll, limit } = e;
      setIdx(Math.round((scroll?.y / limit.y) * (photos.length - 1)));
    });
  }, [scroll]);

  const photos = [
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
      date: "2020, Vancouver (CA)",
    },
    {
      id: uuid(),
      ...createPhotoTitle("/assets/photos/house_home.webp"),
      date: "2019, Vancouver (CA)",
    },
    {
      id: uuid(),
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
              transition={{ delay: 0.01 * idx, duration: 0.3, ease: "easeOut" }}
              key={idx}
              className={`flex-none ${isOverview ? "h-full" : ""}`}
            >
              <Photo
                photo={photo}
                isOverview={isOverview}
                setIsOverview={setIsOverview}
                scroll={scroll}
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

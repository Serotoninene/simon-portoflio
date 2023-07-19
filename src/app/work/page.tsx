"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPhotoTitle } from "@/utils/helpers";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Scroll } from "react-locomotive-scroll";

import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/molecules";

// TO DO
// [] Make a "menu" layout to see all the images at once on click of a button
// [] onClick of one photo, back to the usual layout and scroll to the photo
// [] do the transition between the two layouts

const Photo = ({ photo, idx, setIdx }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  // know the aspect ratio of the photo
  const [aspectRatio, setAspectRatio] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
      key={idx}
      className="h-[100dvh] w-full flex flex-none justify-center items-center py-4"
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

  return (
    <Container className="pt-0">
      <div className="flex items-end h-full w-full relative">
        <div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#scroll-container"
          className="flex items-end fixed left-0 top-0 h-[100dvh] py-4 px-10 w-full z-10"
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
                {title}
              </motion.div>
              <div className="text-sm">{photos[idx]?.date}.</div>
            </div>
          </AnimatePresence>
        </div>
        <div className="relative flex flex-col gap-6 w-full">
          {photos.map((photo, idx) => (
            <Photo key={idx} photo={photo} idx={idx} setIdx={setIdx} />
          ))}
        </div>
      </div>
    </Container>
  );
}

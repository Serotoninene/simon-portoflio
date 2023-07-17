"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPhotoTitle } from "@/utils/helpers";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Scroll } from "react-locomotive-scroll";

import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const Photo = ({ photo, idx, setIdx }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  // const isInView = useInView(ref, { margin: "10%" });
  // useEffect(() => {
  //   if (isInView) setIdx(idx);
  // }, [isInView]);

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

export default function Work({}: Props) {
  const [idx, setIdx] = useState(0);
  const { scroll } = useLocomotiveScroll();

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

  return (
    <>
      <div className="flex items-end h-full w-full relative">
        <div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#scroll-container"
          className="flex items-end fixed left-0 top-0 h-[100dvh] py-4 px-10 w-full z-10"
        >
          <div className="flex justify-between items-center w-full">
            <AnimatePresence mode="wait">
              <motion.div className="font-bold">
                {photos[idx]?.capitalizedTitle}
              </motion.div>
              <div className="text-sm">{photos[idx]?.date}.</div>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative flex flex-col gap-6 w-full">
          {photos.map((photo, idx) => (
            <Photo key={idx} photo={photo} idx={idx} setIdx={setIdx} />
          ))}
        </div>
      </div>
    </>
  );
}

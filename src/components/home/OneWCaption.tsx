"use client";

import React, { useRef } from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";
import { useInView, motion } from "framer-motion";

type Props = {
  photo: Photo;
  children: JSX.Element;
};

export const OneWCaption = ({ photo, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <HomeContainer>
      <div className="grid grid-cols-1 sm:grid-cols-4 h-full gap-6">
        <div className="flex flex-col justify-between">
          <div className="flex sm:justify-end sm:pt-10">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="text-right text-2xl sm:w-3/4 sm:text-2xl md:text-3xl md:leading-relaxed lg:w-3/5 lg:text-[40px]"
            >
              {children}
            </motion.div>
          </div>
          <div className="hidden sm:block">
            <PhotoCaption {...photo.caption} />
          </div>
        </div>

        <div className="sm:col-span-3">
          <AnimPhoto {...photo} />
          <div className="block sm:hidden">
            <PhotoCaption {...photo.caption} />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

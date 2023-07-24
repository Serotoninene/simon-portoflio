"use client";

import React, { useRef } from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";
import { useInView } from "framer-motion";

type Props = {
  photo: Photo;
  children: JSX.Element;
};

export const OneWCaption = ({ photo, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <HomeContainer>
      <div className="grid grid-cols-1 sm:grid-cols-3 h-full gap-6">
        <div className="flex flex-col justify-between">
          <div className="flex sm:justify-end sm:pt-10">
            <div
              ref={ref}
              className="text-right text-2xl sm:w-3/4 md:2/4 sm:text-3xl md:text-[40px] md:leading-relaxed"
            >
              {children}
            </div>
          </div>
          <div className="hidden sm:block">
            <PhotoCaption {...photo.caption} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <AnimPhoto {...photo} />
          <div className="block sm:hidden">
            <PhotoCaption {...photo.caption} />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

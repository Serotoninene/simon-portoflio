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
      <div className="grid grid-cols-3 h-full gap-6">
        <div className="flex flex-col justify-between">
          <div className="flex justify-end pt-10">
            <div ref={ref} className="text-[40px] text-right w-2/4">
              {children}
            </div>
          </div>
          <PhotoCaption idx="3" title="GOOGLE MAPS-ING" />
        </div>

        <div className="col-span-2">
          <AnimPhoto {...photo} />
        </div>
      </div>
    </HomeContainer>
  );
};

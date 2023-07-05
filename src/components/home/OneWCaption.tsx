"use client";

import React, { useEffect, useRef } from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";

type Props = {
  photo: Photo;
  children: JSX.Element;
};

export const OneWCaption = ({ photo, children }: Props) => {
  return (
    <HomeContainer>
      <div className="grid grid-cols-3 h-full gap-6">
        <div className="flex flex-col justify-between">
          <div className="flex justify-end pt-10">
            <div className="text-[40px] text-right w-2/4">{children}</div>
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

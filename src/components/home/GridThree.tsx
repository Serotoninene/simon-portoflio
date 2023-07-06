import React from "react";

import { Photo } from "@/types";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { HomeContainer, PhotoLayout } from "../molecules";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
  thirdPhoto: Photo;
  inverted?: boolean;
};

export const GridThree = ({
  firstPhoto,
  secondPhoto,
  thirdPhoto,
  inverted,
}: Props) => {
  return (
    <HomeContainer>
      <div className="h-full pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-11 sm:gap-6">
        <div
          className={`col-span-5 flex flex-col gap-6 ${inverted && "order-1"}`}
        >
          <div data-scroll data-scroll-speed="3" className="h-full ">
            <AnimPhoto src={firstPhoto.src} alt={firstPhoto.alt} />
          </div>

          <div data-scroll data-scroll-speed="2" className="h-[125%]">
            <PhotoLayout photo={secondPhoto} />
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-12">
          <div
            data-scroll
            data-scroll-speed="1.5"
            className={inverted ? "flex justify-end " : ""}
          >
            <PhotoCaption {...firstPhoto?.caption} />
          </div>
          <div data-scroll data-scroll-speed="0.5" className="h-full ">
            <PhotoLayout photo={thirdPhoto} />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

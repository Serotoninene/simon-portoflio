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
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-11 sm:gap-6">
        <div
          className={`col-span-5 flex flex-col gap-6 ${inverted && "order-1"}`}
        >
          <AnimPhoto src={firstPhoto.src} alt={firstPhoto.alt} />
          <div className="h-[125%]">
            <PhotoLayout photo={secondPhoto} />
          </div>
        </div>
        <div className="col-span-6 flex flex-col gap-12">
          <div className={inverted ? "flex justify-end " : ""}>
            <PhotoCaption {...firstPhoto?.caption} />
          </div>
          <PhotoLayout photo={thirdPhoto} />
        </div>
      </div>
    </HomeContainer>
  );
};

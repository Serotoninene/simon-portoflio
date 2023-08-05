import { Photo } from "@/types";
import React from "react";
import { HomeContainer, PhotoLayout } from "../molecules";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
  inverted?: boolean;
};

export const TwoShifted = ({ firstPhoto, secondPhoto, inverted }: Props) => {
  return (
    <HomeContainer>
      <div className="h-full grid gap-4 sm:grid-cols-12 sm:gap-6">
        <div
          data-scroll
          data-scroll-speed="3"
          className={`sm:col-span-5 h-[60vh] sm:h-[60%] ${
            inverted && "order-2"
          }`}
        >
          <PhotoLayout photo={firstPhoto} />
        </div>
        <div className={inverted ? "order-1" : ""}></div>
        <div
          className="sm:col-span-6 flex items-end"
          data-scroll
          data-scroll-speed="7"
        >
          <div className="flex-auto h-[60vh] sm:h-4/6">
            <PhotoLayout photo={secondPhoto} />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

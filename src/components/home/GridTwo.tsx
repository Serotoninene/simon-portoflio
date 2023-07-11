import React from "react";
import { PhotoLayout } from "../molecules/PhotoLayout";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";
import { LocomotiveScrollOptions } from "react-locomotive-scroll";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const GridTwo = ({ firstPhoto, secondPhoto }: Props) => {
  console.log("grid two");
  return (
    <HomeContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 h-full">
        <div data-scroll data-scroll-speed="8" className="md:col-span-2">
          <PhotoLayout photo={firstPhoto} />
        </div>
        <div data-scroll data-scroll-speed="6">
          <PhotoLayout photo={secondPhoto} />
        </div>
      </div>
    </HomeContainer>
  );
};

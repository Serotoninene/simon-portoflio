import React from "react";
import { Photo } from "@/types";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { HomeContainer } from "../molecules";

type Props = {
  photo: Photo;
};

export const OneWoCaption = ({ photo }: Props) => {
  return (
    <HomeContainer>
      <div className="grid sm:grid-cols-3 h-full gap-4 sm:gap-6">
        <div className="sm:col-span-2">
          <AnimPhoto {...photo} />
        </div>
        <div>
          <PhotoCaption {...photo.caption} />
        </div>
      </div>
    </HomeContainer>
  );
};

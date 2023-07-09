import { Photo } from "@/types";
import React from "react";
import { HomeContainer, PhotoLayout } from "../molecules";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
  thirdPhoto: Photo;
};

export const ThreeAlined = ({ firstPhoto, secondPhoto, thirdPhoto }: Props) => {
  return (
    <HomeContainer>
      <div className="h-full grid sm:grid-cols-3 sm:gap-6">
        <PhotoLayout photo={firstPhoto} />
        <PhotoLayout photo={secondPhoto} />
        <PhotoLayout photo={thirdPhoto} />
      </div>
    </HomeContainer>
  );
};

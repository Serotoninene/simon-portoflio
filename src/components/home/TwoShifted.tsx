import { Photo } from "@/types";
import React from "react";
import { HomeContainer, PhotoLayout } from "../molecules";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const TwoShifted = ({ firstPhoto, secondPhoto }: Props) => {
  return (
    <HomeContainer>
      <div className="h-full sm:grid-cols-2 sm:gap-6">
        <PhotoLayout photo={firstPhoto} />
        <PhotoLayout photo={secondPhoto} />
      </div>
    </HomeContainer>
  );
};

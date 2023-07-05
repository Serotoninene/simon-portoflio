import React from "react";
import { PhotoLayout } from "../molecules/PhotoLayout";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const GridTwo = ({ firstPhoto, secondPhoto }: Props) => {
  return (
    <HomeContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 h-full">
        <div className="md:col-span-2">
          <PhotoLayout photo={firstPhoto} />
        </div>
        <div>
          <PhotoLayout photo={secondPhoto} />
        </div>
      </div>
    </HomeContainer>
  );
};

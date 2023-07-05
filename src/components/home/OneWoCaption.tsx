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
      <div className="grid grid-cols-3 h-full gap-6">
        <div className="col-span-2">
          <AnimPhoto {...photo} />
        </div>
        <div>
          <PhotoCaption idx="3" title="GOOGLE MAPS-ING" />
        </div>
      </div>
    </HomeContainer>
  );
};

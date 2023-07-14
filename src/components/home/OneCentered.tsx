import { Photo } from "@/types";
import React from "react";
import { HomeContainer, PhotoLayout } from "../molecules";

type Props = {
  photo: Photo;
};

export const OneCentered = ({ photo }: Props) => {
  return (
    <HomeContainer>
      <div data-scroll data-scroll-speed="1.2" className="px-9 h-full">
        <PhotoLayout photo={photo} />
      </div>
    </HomeContainer>
  );
};

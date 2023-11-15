import React from "react";
import { PhotoLayout } from "../molecules/PhotoLayout";
import { Photo } from "@/types";
import { HomeContainer } from "../molecules";
import useIsMobile from "@/hooks/useIsMobile";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const GridTwo = ({ firstPhoto, secondPhoto }: Props) => {
  const isMobile = useIsMobile();

  return (
    <HomeContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 h-full">
        <div
          data-scroll
          data-scroll-speed={isMobile ? "1" : "3"}
          className="md:col-span-2"
        >
          <PhotoLayout photo={firstPhoto} />
        </div>
        <div data-scroll data-scroll-speed={isMobile ? "1" : "2"}>
          <PhotoLayout photo={secondPhoto} />
        </div>
      </div>
    </HomeContainer>
  );
};

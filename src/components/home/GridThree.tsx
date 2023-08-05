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
    <HomeContainer fit>
      <div className="pt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 h-full md:grid-cols-11">
        <div
          className={`flex flex-col  md:col-span-5 ${inverted && "order-1"}`}
        >
          <div
            data-scroll
            data-scroll-speed="2"
            className="h-[var(--screen)] sm:h-full"
          >
            <AnimPhoto src={firstPhoto?.src} alt={firstPhoto?.alt} />
            <div className="block sm:hidden mt-4">
              <PhotoCaption {...firstPhoto?.caption} />
            </div>
          </div>

          <div
            data-scroll
            data-scroll-speed="1"
            className="h-[var(--screen)] sm:h-[125%]"
          >
            <PhotoLayout photo={secondPhoto} />
          </div>
        </div>
        <div className="sm:h-[100dvh] md:col-span-6 flex flex-col gap-12">
          <div
            data-scroll
            data-scroll-speed="1"
            className={`hidden sm:flex ${inverted ? "justify-end" : ""}`}
          >
            <PhotoCaption {...firstPhoto?.caption} />
          </div>
          <div
            data-scroll
            data-scroll-speed="0.5"
            className="h-[var(--screen)] sm:h-full"
          >
            <PhotoLayout photo={thirdPhoto} />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

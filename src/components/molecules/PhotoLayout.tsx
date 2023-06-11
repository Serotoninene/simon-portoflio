import React from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import Image from "next/image";

type Props = {};

export const PhotoLayout = (props: Props) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <AnimPhoto src="/assets/photos/house_home.webp" alt="random" />
      <PhotoCaption />
    </div>
  );
};

import React from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";

type Props = {};

export const OneWCaption = (props: Props) => {
  return (
    <div className="grid grid-cols-3 h-[100dvh] gap-4 py-4">
      <div className="flex flex-col justify-between">
        <div className="text-end">Text</div>
        <PhotoCaption />
      </div>

      <div className="col-span-2">
        <AnimPhoto src="/assets/photos/house_home.webp" alt="house_home" />
      </div>
    </div>
  );
};

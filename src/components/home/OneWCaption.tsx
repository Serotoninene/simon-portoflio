import React from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Photo } from "@/types";

type Props = {
  photo: Photo;
  text: string;
};

export const OneWCaption = ({ photo, text }: Props) => {
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

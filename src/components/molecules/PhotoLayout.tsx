import React from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Caption, Photo } from "@/types";

type Props = {
  photo: Photo;
  caption?: Caption;
};

export const PhotoLayout = ({ photo, caption }: Props) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <AnimPhoto src={photo.src} alt={photo.alt} />
      <PhotoCaption {...caption} />
    </div>
  );
};

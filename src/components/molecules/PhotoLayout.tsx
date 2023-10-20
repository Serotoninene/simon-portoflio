import React from "react";
import { AnimPhoto, PhotoCaption } from "../atoms";
import { Photo } from "@/types";

type Props = {
  photo: Photo;
};

export const PhotoLayout = ({ photo }: Props) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <AnimPhoto
        src={photo?.src}
        alt={photo?.alt}
        aspectRatio={photo?.aspectRatio ?? 1}
        dominantColor={photo.dominantColor}
      />
      <PhotoCaption {...photo?.caption} />
    </div>
  );
};

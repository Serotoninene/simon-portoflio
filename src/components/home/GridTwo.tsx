import React from "react";
import { PhotoLayout } from "../molecules/PhotoLayout";
import { Photo } from "@/types";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const GridTwo = ({ firstPhoto, secondPhoto }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 h-[100dvh] py-4">
      <div className="md:col-span-2">
        <PhotoLayout photo={firstPhoto} />
      </div>
      <div>
        <PhotoLayout photo={secondPhoto} />
      </div>
    </div>
  );
};

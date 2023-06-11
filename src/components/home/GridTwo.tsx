import React from "react";
import Image from "next/image";
import { Photo } from "@/types";
import { AnimPhoto } from "../atoms";
import { PhotoLayout } from "../molecules/PhotoLayout";

type Props = {
  firstPhoto: Photo;
  secondPhoto: Photo;
};

export const GridTwo = ({ firstPhoto, secondPhoto }: Props) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4 h-[100dvh] py-4">
      <div className="col-span-2">
        <PhotoLayout />
      </div>
      <div>
        <PhotoLayout />
      </div>
    </div>
  );
};

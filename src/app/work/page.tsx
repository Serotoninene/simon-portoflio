import { createPhoto } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Work({}: Props) {
  let titre = "Titre de la photo";
  let date = "Date de la photo";

  const photos = [
    createPhoto("/assets/photos/house_home.webp"),
    createPhoto("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
    createPhoto("/assets/photos/house_home.webp"),
    createPhoto("/assets/photos/house_home.webp"),
    createPhoto("/assets/photos/house_home.webp"),
    createPhoto("/assets/photos/house_home.webp"),
  ];

  return (
    <div className="flex items-end h-full relative">
      {/* FIXED TITLE AND DATE OF THE PHOTOS */}
      <div className="flex items-end fixed left-0 top-0 bottom-0 py-4 px-10 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-bold">{titre}</div>
          <div className="text-sm">{date}</div>
        </div>
      </div>
      {/* ACTUAL PHOTOS  */}
      <div data-scroll-section className="flex flex-col gap-6 h-full w-full">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="h-[100dvh] w-full flex flex-none justify-center items-center py-4"
          >
            <img
              alt={photo.alt}
              src={photo.src}
              className="object-fit max-h-full max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

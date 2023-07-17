import React from "react";
import { createPhotoTitle } from "@/utils/helpers";

type Props = {};

export default function Work({}: Props) {
  const photos = [
    createPhotoTitle("/assets/photos/house_home.webp"),
    createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
    createPhotoTitle("/assets/photos/house_home.webp"),
    createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
    createPhotoTitle("/assets/photos/house_home.webp"),
    createPhotoTitle("/assets/photos/MY_HOUSE_IS_A_TRIANGLE.jpeg"),
  ];

  return (
    <>
      <div className="flex items-end h-full w-full relative">
        <div
          data-scroll-section
          className="relative flex flex-col gap-6 w-full"
        >
          {photos.map((photo, idx) => (
            <div
              data-scroll
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
    </>
  );
}

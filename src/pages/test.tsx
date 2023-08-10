import React, { useEffect, useState } from "react";

import { photos } from "@/data/photos";
import Image from "next/image";
import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";

type Props = {};

const GalleryPhoto = ({ photo, galleryState }: any) => {
  // GRID STATE
  if (galleryState === "grid")
    return (
      <div
        data-flip-id={photo.alt}
        className="gallery-photo p-2 relative h-[50px] overflow-hidden"
      >
        <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
      </div>
    );

  // FLEX STATE
  return (
    <div
      data-flip-id={photo.alt}
      className="gallery-photo p-6 relative h-screen overflow-hidden"
    >
      <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
    </div>
  );
};

export default function Test(props: Props) {
  const [flipState, setFlipState] = useState<any>();
  const [galleryState, setGalleryState] = useState<"grid" | "flex">("grid");
  const toggleState = () => {
    setFlipState(Flip.getState(".gallery-photo"));
    setGalleryState(galleryState === "grid" ? "flex" : "grid");
  };

  useEffect(() => {
    gsap.registerPlugin(Flip);

    if (!flipState) return;

    Flip.from(flipState, {
      stagger: {
        amount: 0.1,
        from: galleryState === "grid" ? "start" : "end",
      },
      duration: 1.5,
      // staggerFrom: galleryState === "grid" ? "start" : "end",
      ease: Power4.easeInOut,
      absolute: true,
    });
  }, [galleryState, flipState]);

  return (
    <div
      id=".gallery-container"
      className={`${galleryState} grid-cols-4 flex-col gap-10`}
    >
      {photos.map((photo) => (
        <GalleryPhoto
          key={photo.alt}
          photo={photo}
          galleryState={galleryState}
        />
      ))}

      <button onClick={toggleState} className="fixed bottom-10 right-10">
        Click
      </button>
    </div>
  );
}

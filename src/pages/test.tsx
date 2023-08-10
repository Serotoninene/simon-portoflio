import React, { useEffect, useState } from "react";

import { photos } from "./work";
import Image from "next/image";
import { gsap } from "gsap";
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
  const [galleryState, setGalleryState] = useState<"grid" | "flex">("grid");
  const toggleState = () => {
    const state = Flip.getState(".gallery-photo");
    setGalleryState(galleryState === "grid" ? "flex" : "grid");
    Flip.from(state, {
      duration: 2,
      absolute: true,
    });
  };

  useEffect(() => {
    gsap.registerPlugin(Flip);

    return () => {
      gsap.killTweensOf(Flip);
    };
  }, []);
  return (
    <div
      id=".gallery-container"
      className={`${galleryState} grid-cols-4 flex-col gap-10`}
    >
      {photos.map((photo) => (
        <GalleryPhoto
          photo={photo}
          galleryState={galleryState}
          key={photo.alt}
        />
      ))}

      <button onClick={toggleState} className="fixed bottom-10 right-10">
        Click
      </button>
    </div>
  );
}

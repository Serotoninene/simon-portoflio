import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { photos } from "./work";
import Image from "next/image";
import { gsap, Power3 } from "gsap";
import { Flip } from "gsap/dist/Flip";

type Props = {};

const GalleryPhoto = ({ idx, photo, photosRef, galleryState }: any) => {
  // GRID STATE
  if (galleryState === "grid")
    return (
      <div
        ref={(e) => (photosRef.current[idx] = e)}
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
  const photosRef = useRef<any[]>([]);
  const [flipState, setFlipState] = useState<any>();
  const [galleryState, setGalleryState] = useState<"grid" | "flex">("grid");
  const toggleState = () => {
    setFlipState(Flip.getState(".gallery-photo"));
    setGalleryState(galleryState === "grid" ? "flex" : "grid");
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);

    if (!flipState) return;

    Flip.from(flipState, {
      stagger: {
        amount: 0.1,
        from: galleryState === "grid" ? "start" : "end",
      },
      // staggerFrom: galleryState === "grid" ? "start" : "end",
      ease: Power3.easeOut,
      absolute: true,
    });
  }, [galleryState, flipState]);

  return (
    <div
      id=".gallery-container"
      className={`${galleryState} grid-cols-4 flex-col gap-10`}
    >
      {photos.map((photo, idx) => (
        <GalleryPhoto
          idx={idx}
          photo={photo}
          photosRef={photosRef}
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

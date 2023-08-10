import { Suspense, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { Loader } from "@/components/organisms";

import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { photos } from "@/data/photos";

const HTMLPart = () => {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");
  const { isOverview } = useOverviewContext();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, [isOverview]);

  // updated the title when the idx changes
  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  // updating the idx when the scrollYProgress changes
  useEffect(() => {
    if (!scrollYProgress) return;
    scrollYProgress.on("change", (e: any) => {
      setIdx(Math.round(e * (photos.length - 1)));
    });
  }, [scrollYProgress]);

  return (
    <>
      <div
        id="gallery-container"
        className={`relative ${
          isOverview
            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-6"
            : "flex flex-col gap-6 sm:gap-8 md:gap-[50vh]"
        }`}
      >
        {photos.map((photo, idx) => (
          <div
            key={photo.alt}
            className={isOverview ? "flex h-fit overflow-hidden " : ""}
          >
            <Photo photo={photo} />
          </div>
        ))}
      </div>
      <WorkFooter photos={photos} title={title} idx={idx} />
    </>
  );
};

// i need the src, alt, capitalizedTitle, and the date

export default function Work() {
  if (!photos) return;
  return (
    <Container className="pt-0">
      <OverviewProvider>
        <Suspense fallback={<Loader />}>
          {/* <div className="fixed top-0 left-0 right-0 bottom-0">
            <Scene photos={photos} />
          </div> */}
          <HTMLPart />
        </Suspense>
      </OverviewProvider>
    </Container>
  );
}

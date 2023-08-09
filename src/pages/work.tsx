import { Suspense, useEffect, useState } from "react";
import { LayoutGroup, motion, useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { Photo, Scene, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { workPhotos as photos } from "@/utils/store";
import { Loader } from "@/components/organisms";
import { createPhotoTitle, updateDominantColors } from "@/utils/helpers";

const HTMLPart = () => {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");
  const { isOverview } = useOverviewContext();

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setTitle(photos[idx]?.capitalizedTitle);
  }, [idx]);

  useEffect(() => {
    if (!scrollYProgress) return;
    scrollYProgress.on("change", (e: any) => {
      setIdx(Math.round(e * (photos.length - 1)));
    });
  }, [scrollYProgress]);

  return (
    <>
      {" "}
      <LayoutGroup>
        <motion.div
          layout
          data-scroll-section
          className={`relative ${
            isOverview
              ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-6"
              : "flex flex-col gap-6 sm:gap-8 md:gap-[50vh]"
          }`}
        >
          {photos.map((photo, idx) => (
            <motion.div
              layout
              initial={{ y: "50%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.005 * idx, ease: "easeOut" }}
              key={idx}
              className={`flex-none  ${
                isOverview ? "flex h-full overflow-hidden " : ""
              }`}
            >
              <Photo photo={photo} />
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
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
          <div className="fixed top-0 left-0 right-0 bottom-0">
            <Scene photos={photos} />
          </div>
          <HTMLPart />
        </Suspense>
      </OverviewProvider>
    </Container>
  );
}

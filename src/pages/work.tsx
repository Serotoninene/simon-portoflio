import { Suspense, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { Loader } from "@/components/organisms";

import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { photos } from "@/data/photos";

const HTMLPart = () => {
  const { scrollYProgress } = useScroll();
  const { isOverview, flipState, handleOverviewSwitch } = useOverviewContext();

  // TO CHECK : DO I REALLY NEED THIS IDX ?
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");
  const [photoTarget, setPhotoTarget] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(Flip);

    if (!flipState) return;

    const topTarget = document.getElementById(photoTarget)?.offsetTop || 0;
    let oldScroll = 0;

    if (!isOverview) {
      oldScroll = window.scrollY;
    }

    Flip.from(flipState, {
      duration: 1.5,
      ease: Power4.easeInOut,
      absolute: true,
      stagger: {
        amount: 0.1,
        from: isOverview ? "start" : "end",
      },
      onStart: () => {
        if (isOverview) return;
        //or to scroll to the element with the ID "#someID":

        gsap.to(window, { scrollTo: topTarget, duration: 2, delay: 0.7 });
      },
    });
  }, [isOverview, flipState]);

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
        className={
          isOverview ? "grid-gallery" : "flex-gallery relative bg-light"
        }
      >
        {photos.map((photo) => (
          <Photo
            key={photo.alt}
            photo={photo}
            setPhotoTarget={setPhotoTarget}
          />
        ))}
      </div>
      <WorkFooter photos={photos} title={title} idx={idx} />
    </>
  );
};

export default function Work() {
  if (!photos) return;
  return (
    <>
      <Container className="pt-0 bg-light">
        <OverviewProvider>
          <Suspense fallback={<Loader />}>
            {/* <div className="fixed top-0 left-0 right-0 bottom-0">
            <Scene photos={photos} />
          </div> */}
            <HTMLPart />
          </Suspense>
        </OverviewProvider>
      </Container>
    </>
  );
}

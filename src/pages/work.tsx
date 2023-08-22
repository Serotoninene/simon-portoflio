import { useEffect, useState } from "react";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { photos } from "@/data/photos";

import { AnimatePresence, motion } from "framer-motion";

import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { LocomotiveScrollContainer } from "@/components/molecules/SmoothScrollContainer";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { ExtendedPhoto } from "@/types";

const Gallery = ({ photos, photoGroup, setTitle }: any) => {
  const { scroll } = useLocomotiveScroll();
  const [photosDisplayed, setPhotosDisplayed] = useState([]);
  const [photoTarget, setPhotoTarget] = useState("");
  const { isOverview, flipState } = useOverviewContext();

  useEffect(() => {
    if (!photos) return;
    const photosDisplayed = photos.filter(
      (photo: ExtendedPhoto) => photo.group === photoGroup
    );
    setPhotosDisplayed(photosDisplayed);
  }, [photoGroup]);

  useEffect(() => {
    if (!scroll) return;

    // Update the title when the scroll changes
    scroll.on("scroll", (e: any) => {
      const idx = Math.round(
        (e.scroll.y / e.limit.y) * (photosDisplayed.length - 1)
      );

      // @ts-ignore
      setTitle(photosDisplayed[idx]?.capitalizedTitle);
    });

    // Update the title when the scroll changes
  }, [scroll, photosDisplayed]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    const target = document.getElementById(photoTarget);

    if (!flipState) return;
    scroll.update(); // update the locoscroll so it resizes the container
    scroll.scrollTo(0, 0, 0); // scroll to the top of the page if we are in the overview
    Flip.from(flipState, {
      duration: 1.5,
      ease: Power4.easeInOut,
      absolute: true,
      stagger: {
        amount: 0.1,
        from: isOverview ? "start" : "end",
      },
      onComplete: () => {
        if (isOverview) return;
        scroll.scrollTo(target);
      },
    });
  }, [isOverview, flipState]);

  return (
    <AnimatePresence mode="popLayout">
      <div
        id="gallery-container"
        className={
          isOverview ? "grid-gallery" : "flex-gallery relative bg-light"
        }
      >
        {photosDisplayed.map((photo: ExtendedPhoto, idx: number) => (
          <div id={photo.alt} key={photo.alt}>
            <motion.div
              key={photoGroup}
              initial={{ opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, y: "-150%" }}
              transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
            >
              <Photo idx={idx} photo={photo} setPhotoTarget={setPhotoTarget} />
            </motion.div>
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default function Work() {
  const [title, setTitle] = useState("");
  const [photoGroup, setPhotoGroup] = useState<
    "summer" | "autumn" | "winter" | "spring"
  >("summer");

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  if (!photos) return;

  return (
    <>
      <Container className="pt-0 bg-light relative">
        <OverviewProvider>
          <LocomotiveScrollContainer>
            <Container>
              <Gallery
                photos={photos}
                photoGroup={photoGroup}
                setTitle={setTitle}
              />
            </Container>
          </LocomotiveScrollContainer>
          <WorkFooter
            title={title}
            photoGroup={photoGroup}
            setPhotoGroup={setPhotoGroup}
          />
        </OverviewProvider>
      </Container>
    </>
  );
}

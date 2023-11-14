import { useEffect, useState } from "react";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/context/OverviewContext";

import { photos } from "@/data/photos";

import { AnimatePresence, motion } from "framer-motion";

import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { LocomotiveScrollContainer } from "@/components/molecules/SmoothScrollContainer";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { ExtendedPhoto } from "@/types";
import { useWindowSize } from "@/utils/hooks";

type GalleryProps = {
  photos: ExtendedPhoto[];
  photoGroup: "summer" | "autumn" | "winter" | "spring";
  setInfos: (infos: PhotoInfo) => void;
};

export type PhotoInfo = {
  title: string;
  place: string;
  date: string;
};

gsap.registerPlugin(Flip);

const Gallery = ({ photos, photoGroup, setInfos }: GalleryProps) => {
  const { scroll } = useLocomotiveScroll();
  const { width } = useWindowSize();
  const [photosDisplayed, setPhotosDisplayed] = useState<ExtendedPhoto[]>([]);
  const [photoTarget, setPhotoTarget] = useState("");
  const { isOverview, flipState } = useOverviewContext();

  useEffect(() => {
    if (!photos) return;
    const photosDisplayed = photos.filter(
      (photo: ExtendedPhoto) => photo.group === photoGroup
    );
    // go back to the top of the page
    setPhotosDisplayed(photosDisplayed);
    scroll?.scrollTo(0, 0, 0);
  }, [photoGroup]);

  useEffect(() => {
    // Update the title when the scroll changes
    scroll?.on("scroll", (e: any) => {
      const idx = Math.round(
        (e.scroll.y / e.limit.y) * (photosDisplayed.length - 1)
      );

      setInfos?.({
        title: photosDisplayed[idx]?.capitalizedTitle,
        place: photosDisplayed[idx]?.place,
        date: photosDisplayed[idx]?.date,
      });
    });

    // Update the title when the scroll changes
  }, [scroll, photosDisplayed]);

  useEffect(() => {
    // Flip the photos when we change the photo group
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
      <div className="px-5">
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
                <Photo
                  idx={idx}
                  photo={photo}
                  setPhotoTarget={setPhotoTarget}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default function Work() {
  const [infos, setInfos] = useState<PhotoInfo>({
    title: "",
    place: "",
    date: "",
  });

  const [photoGroup, setPhotoGroup] = useState<
    "summer" | "autumn" | "winter" | "spring"
  >("summer");

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    // updateAspectRatio(photos);
    // updateDominantColors(photos).then((photos) => {
    //   console.log(JSON.stringify(photos));
    // });
  }, []);

  if (!photos) return;

  return (
    <Container className="pt-0 bg-light relative">
      <OverviewProvider>
        <LocomotiveScrollContainer>
          <Gallery
            photos={photos}
            photoGroup={photoGroup}
            setInfos={setInfos}
          />
        </LocomotiveScrollContainer>
        <WorkFooter
          infos={infos}
          photoGroup={photoGroup}
          setPhotoGroup={setPhotoGroup}
        />
      </OverviewProvider>
    </Container>
  );
}

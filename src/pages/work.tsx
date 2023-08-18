import { useEffect, useState } from "react";

import { Container } from "@/components/molecules";
import { Photo, WorkFooter } from "@/components/work";
import {
  OverviewProvider,
  useOverviewContext,
} from "@/components/context/OverviewContext";

import { photos } from "@/data/photos";

import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { LocomotiveScrollContainer } from "@/components/molecules/SmoothScrollContainer";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { ExtendedPhoto } from "@/types";
import { getAspectRatio } from "@/utils/helpers";

const Gallery = ({ photos, setTitle }: any) => {
  const { isOverview, flipState } = useOverviewContext();
  const [photoTarget, setPhotoTarget] = useState("");
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!scroll) return;

    // Update the title when the scroll changes
    scroll.on("scroll", (e: any) => {
      const idx = Math.round((e.scroll.y / e.limit.y) * (photos.length - 1));
      setTitle(photos[idx]?.capitalizedTitle);
    });
  }, [scroll]);

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
    <div
      id="gallery-container"
      className={isOverview ? "grid-gallery" : "flex-gallery relative bg-light"}
    >
      {photos.map((photo: ExtendedPhoto, idx: number) => (
        <div id={photo.alt} key={photo.alt}>
          <Photo idx={idx} photo={photo} setPhotoTarget={setPhotoTarget} />
        </div>
      ))}
    </div>
  );
};

export default function Work() {
  const [title, setTitle] = useState("");

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
              <Gallery photos={photos} setTitle={setTitle} />
            </Container>
          </LocomotiveScrollContainer>
          <WorkFooter photos={photos} title={title} />
        </OverviewProvider>
      </Container>
    </>
  );
}

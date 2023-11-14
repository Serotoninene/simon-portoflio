import { useEffect, useState } from "react";

import { useOverviewContext } from "@/context/OverviewContext";

import { gsap, Power4 } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { useLocomotiveScroll } from "react-locomotive-scroll";

gsap.registerPlugin(Flip);

const useFlipAnimation = () => {
  const { scroll } = useLocomotiveScroll();
  const [photoTarget, setPhotoTarget] = useState("");
  const { isOverview, flipState } = useOverviewContext();

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

  return { photoTarget, setPhotoTarget };
};

export default useFlipAnimation;

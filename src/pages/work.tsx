import { useEffect, useState } from "react";
import { LayoutGroup, motion, useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { Photo, Scene, WorkFooter } from "@/components/work";

const photos = [
  {
    src: "/assets/photos/10_TIME_FOR_LAUNDRY.jpeg",
    alt: "0_TIME_FOR_LAUNDRY",
    capitalizedTitle: "Time for laundry",
    dominantColor: "#aba5ac",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/09_SUPERMARKET.jpeg",
    alt: "9_SUPERMARKET",
    capitalizedTitle: "Supermarket",
    dominantColor: "#a82f28",
    date: "2020, Vancouver (CA)",
  },
  {
    src: "/assets/photos/08_ALL_ABOUT_CLEANING.jpeg",
    alt: "8_ALL_ABOUT_CLEANING",
    capitalizedTitle: "All about cleaning",
    dominantColor: "#cab0a8",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/02_MY_HOUSE_IS_A_TRIANGLE.jpeg",
    alt: "2_MY_HOUSE_IS_A_TRIANGLE",
    capitalizedTitle: "My house is a triangle",
    dominantColor: "#a09a9d",
    date: "2020, Vancouver (CA)",
  },
  {
    src: "/assets/photos/01_MY_GARDEN_IS_COOL.jpeg",
    alt: "1_MY_GARDEN_IS_COOL",
    capitalizedTitle: "My garden is cool",
    dominantColor: "#272413",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/03_GOOGLE_MAPS-ING.jpeg",
    alt: "3_GOOGLE_MAPS-ING",
    capitalizedTitle: "Google maps-ing",
    dominantColor: "#42361e",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/04_FISHING.jpeg",
    alt: "4_FISHING",
    capitalizedTitle: "Fishing",
    dominantColor: "#bfbda2",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/05_LIVING_ON_A_BOAT.jpeg",
    alt: "5_LIVING_ON_A_BOAT",
    capitalizedTitle: "Living on a boat",
    dominantColor: "#708d99",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/06_CROWDED.jpeg",
    alt: "6_CROWDED",
    capitalizedTitle: "Crowded",
    dominantColor: "#396b76",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/07_SQUARED.jpeg",
    alt: "7_SQUARED",
    capitalizedTitle: "Squared",
    dominantColor: "#957858",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/11_APERITIF.jpeg",
    alt: "1_APERITIF",
    capitalizedTitle: "Aperitif",
    dominantColor: "#bfb7ae",
    date: "2019, Vancouver (CA)",
  },
  {
    src: "/assets/photos/31_LIFE_PERSPECTIVES.jpeg",
    alt: "1_LIFE_PERSPECTIVES",
    capitalizedTitle: "Life perspectives",
    dominantColor: "#66819d",
    date: "2019, Vancouver (CA)",
  },
];

export default function Work() {
  const [idx, setIdx] = useState(0);
  const [title, setTitle] = useState("");

  const [isOverview, setIsOverview] = useState(false);
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

  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        ease: "easeOut",
      },
    },
  };

  const handleToggleLayout = () => {
    setIsOverview((prev) => !prev);
  };

  return (
    <Container className="pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <div className="fixed top-0 left-0 right-0 bottom-0">
          <Scene photos={photos} />
        </div>
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
                <Photo
                  photo={photo}
                  isOverview={isOverview}
                  setIsOverview={setIsOverview}
                />
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>

        <WorkFooter
          photos={photos}
          title={title}
          idx={idx}
          variants={variants}
          isOverview={isOverview}
          handleToggleLayout={handleToggleLayout}
        />
      </motion.div>
    </Container>
  );
}

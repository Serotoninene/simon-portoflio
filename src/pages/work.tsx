import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";

import { loadImage, rgbToHex } from "@/utils/helpers";

import ColorThief from "colorthief";
import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";

import { Container } from "@/components/molecules";
import { useWindowSize } from "@/utils/hooks";
import { usePathname } from "next/navigation";

import { CustomCanvas } from "@/components/three";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";

import fragment from "@shaders/WorkPhotoShader/fragment.glsl";
import vertex from "@shaders/WorkPhotoShader/vertex.glsl";
import { gsap } from "gsap";
import { useControls } from "leva";

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

const ColorShiftMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTextureSize: new THREE.Vector2(0, 0),
    uQuadSize: new THREE.Vector2(0, 0),
    uProgress: 0,
  },
  vertex,
  fragment
);
extend({ ColorShiftMaterial });

const ThreePhoto = ({ photo, isOverview }: any) => {
  const shaderRef = useRef<any>();
  const { height, width } = useWindowSize();
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const { zPosition } = useControls({
    zPosition: {
      value: 0,
      min: -100,
      max: 100,
    },
  });

  const texture = useTexture(photo.src) as THREE.Texture;

  useEffect(() => {
    gsap.to(shaderRef.current, {
      uProgress: 1,
      duration: 1,
      delay: 0.5,
      ease: "easeOut",
    });
  }, []);

  useFrame(() => {
    const photoDiv = document.getElementById(photo.alt);
    const rect = photoDiv?.getBoundingClientRect();

    if (!rect) return;
    if (height && width) {
      const x = rect?.left - width / 2 + rect?.width / 2;
      const y = -rect?.top + height / 2 - rect?.height / 2;

      setPhotoData({
        x,
        // Add a delay to the y movement to create a parallax effect
        y: THREE.MathUtils.lerp(photoData.y, y, 0.04),
        height: rect?.height,
        width: rect?.width,
      });
    }

    shaderRef.current.uTextureSize.set(
      texture.image.width,
      texture.image.height
    );
    shaderRef.current.uQuadSize.set(photoData.width, photoData.height);
  });

  return (
    <mesh position={[photoData.x, photoData.y, zPosition]}>
      <planeGeometry args={[photoData.width, photoData.height, 1]} />
      {/* @ts-ignore */}
      <colorShiftMaterial ref={shaderRef} uTexture={texture} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <CustomCanvas>
      {/* <Perf /> */}
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        {photos.map((photo, idx) => (
          <ThreePhoto key={idx} photo={photo} idx={idx} />
        ))}
      </Suspense>
    </CustomCanvas>
  );
};

const Photo = ({ photo, setIsOverview, isOverview }: any) => {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [dominantColor, setDominantColor] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // know the aspect ratio of the photo
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleClick = async () => {
    // wait for the change of state for the overview before scrolling
    await setIsOverview(false);
    if (!width) return;
    const { top } = ref.current?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({
      top: top + window.scrollY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!dominantColor) return;
    if (childRef.current) {
      childRef.current.style.backgroundColor = dominantColor;
    }
  }, [dominantColor]);

  useEffect(() => {
    if (!width || !height) return;
    const img = loadImage(photo.src);
    const colorThief = new ColorThief();

    img.src = photo.src;
    img.onload = () => {
      const color = colorThief.getColor(img);
      setDominantColor(rgbToHex(color));
      setAspectRatio(img.width / img.height);
    };

    const windowAspectRatio = width / height;

    setImageSize({
      width:
        aspectRatio > 1
          ? (width / windowAspectRatio) * aspectRatio - 48
          : height * aspectRatio - 32,
      height: 400,
    });
  }, [photo.src, width, height, aspectRatio]);

  useEffect(() => {}, []);

  if (!width || !height) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        layout
        transition={{ scaleX: { duration: 15 } }}
        data-scroll
        data-scroll-to
        key={path}
        className={`${
          !isOverview
            ? "h-[100vh] py-4 items-center"
            : "h-[25vh] cursor-pointer items-start"
        } w-full flex flex-col flex-none justify-center relative pointer-events-auto `}
        onClick={handleClick}
      >
        <div className="opacity-0">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ y: "100%" }}
            transition={{ delay: 0.5, ease: "easeOut" }}
            className=""
            ref={childRef}
          >
            <Image
              id={photo.alt}
              alt={photo.alt}
              width={!isOverview ? imageSize.width : undefined}
              height={!isOverview ? imageSize.height : undefined}
              placeholder="blur"
              blurDataURL={photo.src}
              fill={isOverview}
              src={photo.src}
              className="object-cover "
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const WorkFooter = ({
  photos,
  idx,
  title,
  variants,
  isOverview,
  handleToggleLayout,
}: any) => {
  return (
    <div
      data-scroll
      data-scroll-sticky
      data-scroll-target="#scroll-container"
      className={`flex items-end fixed left-0 top-0 h-[100vh] py-4 px-10 w-full ${
        isOverview ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <AnimatePresence mode="popLayout">
        <div className="flex justify-between items-center w-full mix-blend-difference">
          <motion.div
            key={title}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="font-bold"
          >
            {title}{" "}
            <span className="text-sm font-normal">{photos[idx]?.date}.</span>
          </motion.div>
          <div className="cursor-pointer" onClick={handleToggleLayout}>
            See all photos
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
          <Scene />
        </div>
        <LayoutGroup>
          <motion.div
            layout
            data-scroll-section
            className={`relative  ${
              isOverview
                ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 h-full gap-2"
                : "flex flex-col gap-6 sm:gap-8 md:gap-[50vh]"
            } w-full`}
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

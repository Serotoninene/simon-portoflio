import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { spartan } from "../molecules/Layout";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import vertexShader from "@shaders/HomePhotoShader/vertex.glsl";
import fragmentShader from "@shaders/HomePhotoShader/fragment.glsl";
import { useWindowSize } from "@/utils/hooks";
import { useControls, Leva } from "leva";

import { Power4, gsap } from "gsap";
import { motion } from "framer-motion";
import AnimatedLetters from "../atoms/AnimLetters";
import { ease } from "@/utils/store";
import { CustomCanvas } from "@components/three";

type SceneProps = {
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Box = ({ setIsLoaded }: SceneProps) => {
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  // make a ref for the numbers or string and be sure to add the types

  const introTl = useRef<GSAPTimeline | null>(null);
  const { height, width } = useWindowSize();
  const meshRef = React.useRef() as MutableRefObject<any>;
  const geometryRef = React.useRef() as MutableRefObject<any>;
  const shaderRef = React.useRef() as MutableRefObject<any>;

  const { uProgress } = useControls("webgl", {
    uProgress: { value: 0, min: 0, max: 1, step: 0.1 },
  });

  const controls = useControls("shader zoom", {
    uRadius: { value: 0.07, min: 0, max: 1, step: 0.001 },
    uIntensity: { value: 0.02, min: 0, max: 0.5, step: 0.001 },
  });

  const { uIntro, uDeformVertex, uIntensityVertex } = useControls("intro", {
    uIntro: { value: 0, min: 0, max: 1, step: 0.1 },
    uDeformVertex: { value: 2.1, min: 0, max: 10, step: 0.1 },
    uIntensityVertex: { value: 100, min: 0, max: 20, step: 0.1 },
  });

  const [texture, displacementMap] = useLoader(
    THREE.TextureLoader,
    ["/assets/photos/00_ACCUEIL.jpeg", "/assets/disp/disp1.jpg"],
    () => {
      // init the animation of the page when texure is loaded
      setIsLoaded(true);
    }
  );

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uDisplacement: { value: displacementMap },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uQuadSize: {
        value: new THREE.Vector2(photoData.width, photoData.height),
      },
      uMappedMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uProgress: { value: uProgress },
      uRadius: { value: controls.uRadius },
      uIntensity: { value: controls.uIntensity },
      uIntensityVertex: { value: uIntensityVertex },
      uDeformVertex: { value: 0 },
      uIntro: { value: uIntro },
    }),
    []
  );

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();

    const mappedMouse = new THREE.Vector2(
      THREE.MathUtils.mapLinear(mouse.x, -1, 1, 0, 1),
      THREE.MathUtils.mapLinear(mouse.y, -1, 1, 0, 1)
    );

    const photoDiv = document.getElementById("hero-photo");

    const rect = photoDiv?.getBoundingClientRect();

    shaderRef.current.uniforms.uMappedMouse.value = mappedMouse;
    shaderRef.current.uniforms.uMouse.value = mouse;
    shaderRef.current.uniforms.uTime.value = time;
    // shaderRef.current.uniforms.uProgress.value = uProgress;
    shaderRef.current.uniforms.uRadius.value = controls.uRadius;
    shaderRef.current.uniforms.uIntensity.value = controls.uIntensity;
    // shaderRef.current.uniforms.uIntro.value = uIntro;
    shaderRef.current.uniforms.uDeformVertex.value = uDeformVertex;
    shaderRef.current.uniforms.uIntensityVertex.value = uIntensityVertex;

    if (!rect) return;
    if (height && width) {
      const x = rect?.left - width / 2 + rect?.width / 2;
      const y = -rect?.top + height / 2 - rect?.height / 2;

      setPhotoData({
        x,
        y,
        height: rect?.height,
        width: rect.width,
      });
    }

    shaderRef.current.uniforms.uQuadSize.value = new THREE.Vector2(
      photoData.width,
      photoData.height
    );
  });

  useEffect(() => {
    introTl.current = gsap.timeline();

    introTl.current
      .to(shaderRef.current.uniforms.uIntro, {
        value: 1,
        duration: 1.5,
        ease: Power4.easeOut,
      })
      .to(shaderRef.current.uniforms.uProgress, {
        value: 1,
      });

    return () => {
      if (introTl.current) {
        introTl.current.kill();
      }
    };
  }, []);

  return (
    <mesh ref={meshRef} position={[photoData.x, photoData.y, 0]}>
      <planeGeometry
        ref={geometryRef}
        args={[photoData.width, photoData.height, 32, 32]}
      />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = ({ setIsLoaded }: SceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width } = useWindowSize();
  const [correctFov, setCorrectFov] = useState(0);

  useEffect(() => {
    if (!height || !width) return;

    setCorrectFov(((Math.atan(height / 2 / 600) * 180) / Math.PI) * 2);
  }, [height, width]);

  return (
    <CustomCanvas>
      {/* <OrbitControls enableZoom={false} /> */}
      <Box setIsLoaded={setIsLoaded} />
    </CustomCanvas>
  );
};

export const HeroHome = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      <div className="h-[var(--fullScreen)] z-10 fixed top-0 left-0 right-0 ">
        <Leva hidden />
        <Scene setIsLoaded={setIsLoaded} />
      </div>
      <div className="h-[var(--fullScreen)] flex flex-col justify-between gap-6 pt-10 pb-10">
        <div
          data-scroll
          data-scroll-speed="0.2"
          ref={ref}
          id="hero-photo"
          className="h-full relative opacity-0 cursor-none pointer-events-auto"
        >
          <Image
            alt="house in a green field"
            src="/assets/photos/00_ACCUEIL.jpeg"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="sm:flex justify-between items-end">
          {/* wait until isLoaded is true to trigger the anim */}

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={!isLoaded ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", delay: 0.15 }}
            className="hidden md:block pb-1"
          >
            Hi, here is an overview of <br />
            my personal artistic work.
          </motion.h2>
          <h1
            className={`${spartan.className} text-end flex-none  text-2xl align-bottom leading-none sm:flex-1 sm:text-[64px]`}
          >
            <AnimatedLetters
              string="SIMON EYCHENNE"
              delay={0.1}
              start={isLoaded}
              rotate={15}
              duration={1}
              y={100}
              stagger={0.01}
              ease={ease}
            />
          </h1>
        </div>
      </div>
    </>
  );
};

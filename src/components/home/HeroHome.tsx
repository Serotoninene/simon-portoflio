import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { spartan } from "../molecules/Layout";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import vertexShader from "@shaders/HomePhotoShader/vertex.glsl";
import fragmentShader from "@shaders/HomePhotoShader/fragment.glsl";
import { useWindowSize } from "@/utils/hooks";

import { Power4, gsap } from "gsap";
import { motion } from "framer-motion";
import AnimatedLetters from "../atoms/AnimLetters";
import { ease } from "@/utils/store";
import { CustomCanvas } from "@components/three";
import { useLoadingContext } from "@/context/LoadingContext";

const HeroPhoto = () => {
  // setting up the values
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const { setIsLoaded } = useLoadingContext();
  const introTl = useRef<GSAPTimeline | null>(null);
  const { height, width } = useWindowSize();
  const meshRef = useRef<any>();
  const geometryRef = useRef<any>();
  const shaderRef = useRef<any>();

  // loading the texture
  const [texture, displacementMap] = useLoader(
    THREE.TextureLoader,
    ["/assets/photos/home/00_ACCUEIL.jpeg", "/assets/disp/disp1.jpg"],
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
      uProgress: { value: 0 },
      uRadius: { value: 0.07 },
      uIntensity: { value: 0.02 },
      uIntro: { value: 0 },
    }),
    []
  );

  // updating the uniforms and photoData
  useFrame(({ mouse }) => {
    const mappedMouse = new THREE.Vector2(
      THREE.MathUtils.mapLinear(mouse.x, -1, 1, 0, 1),
      THREE.MathUtils.mapLinear(mouse.y, -1, 1, 0, 1)
    );

    const photoDiv = document.getElementById("hero-photo");
    const rect = photoDiv?.getBoundingClientRect();

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

    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uMappedMouse.value = mappedMouse;
    shaderRef.current.uniforms.uQuadSize.value = new THREE.Vector2(
      photoData.width,
      photoData.height
    );
  });

  // intro anim - gsap part
  useEffect(() => {
    introTl.current = gsap.timeline();

    introTl.current
      .to(shaderRef.current.uniforms.uIntro, {
        value: 1,
        duration: 1.5,
        ease: Power4.easeOut,
      })
      .to(
        shaderRef.current.uniforms.uProgress,
        {
          value: 1,
        },
        "<40%"
      );

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
        args={[photoData.width, photoData.height, 2, 2]}
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

const Scene = () => {
  return (
    <CustomCanvas>
      <HeroPhoto />
    </CustomCanvas>
  );
};

export const HeroHome = () => {
  const { isLoaded } = useLoadingContext();

  return (
    <>
      <div className="h-[var(--fullScreen)] z-10 fixed top-0 left-0 right-0 ">
        <Scene />
      </div>
      <div className="h-[var(--fullScreen)] flex flex-col justify-between gap-6 pt-10 pb-10">
        <div
          data-scroll
          data-scroll-speed="0.2"
          id="hero-photo"
          className="h-full relative opacity-0 cursor-none pointer-events-auto"
        >
          <Image
            alt="house in a green field"
            src="/assets/photos/home/00_ACCUEIL.jpeg"
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
            className={`${spartan.className} text-end flex-none text-2xl align-bottom leading-none sm:flex-1 sm:text-[48px] lg:text-[64px]`}
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

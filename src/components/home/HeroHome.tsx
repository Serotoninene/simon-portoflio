import React from "react";
import Image from "next/image";
import { spartan } from "../molecules/Layout";
import * as THREE from "three";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import vertexShader from "@shaders/HomePhotoShader/vertex.glsl";
import fragmentShader from "@shaders/HomePhotoShader/fragment.glsl";

// [] search for 'type declaration vertexshader glsl'
// [] make the image cover the plane without losing its aspect ratio
// [] calculate the camera z position so the units of the canvas match the pixels of the page
// [] fix the mesh on the html div

const Box = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/photos/00_ACCUEIL.jpeg"
  );

  return (
    <mesh>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTextureSize: {
            value: new THREE.Vector2(texture.image.width, texture.image.height),
          },
          uQuadSize: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Box />
    </Canvas>
  );
};

export const HeroHome = (props: Props) => {
  return (
    <>
      <div className="h-[100dvh]  z-10 fixed top-0 left-0 right-0">
        <Scene />
      </div>
      <div className="h-[calc(100dvh-32px)] flex flex-col justify-between gap-6 pt-10 pb-6">
        <div className="h-full relative opacity-10">
          <Image
            alt="house in a green field"
            src="/assets/photos/00_ACCUEIL.jpeg"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="sm:flex justify-between items-end">
          <h2 className="hidden md:block pb-1">
            Hi, here is an overview of <br />
            my personal artistic work.
          </h2>
          <h1
            className={`${spartan.className} text-end flex-none text-2xl align-bottom leading-none sm:flex-1 sm:text-[64px]`}
          >
            SIMON EYCHENNE
          </h1>
        </div>
      </div>
    </>
  );
};

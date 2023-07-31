import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { spartan } from "../molecules/Layout";
import * as THREE from "three";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";

import vertexShader from "@shaders/HomePhotoShader/vertex.glsl";
import fragmentShader from "@shaders/HomePhotoShader/fragment.glsl";
import { useWindowSize } from "@/utils/hooks";

// [X] search for 'type declaration vertexshader glsl'
// [X] make the image cover the plane without losing its aspect ratio
// [X] calculate the camera z position so the units of the canvas match the pixels of the page
// [] fix the mesh on the html div

type PhotoData = { x: number; y: number; width: number; height: number };
type SceneProps = {
  photoData: PhotoData;
};

type BoxProps = {
  photoData: PhotoData;
};

const Box = ({ photoData }: BoxProps) => {
  const geometryRef = React.useRef() as MutableRefObject<any>;
  const shaderRef = React.useRef() as MutableRefObject<any>;

  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/photos/00_ACCUEIL.jpeg"
  );

  console.log(photoData);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    const x = mouse.x;
    const y = mouse.y;

    shaderRef.current.uniforms.uMouse.value = mouse;

    geometryRef.current.width = photoData.width;
  });

  return (
    <mesh position={[0, 0, 0]} scale={new THREE.Vector3(1, 1, 0)}>
      <planeGeometry ref={geometryRef} args={[1512, 834]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTextureSize: {
            value: new THREE.Vector2(texture.image.width, texture.image.height),
          },
          uQuadSize: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
      />
    </mesh>
  );
};

const Scene = ({ photoData }: SceneProps) => {
  const { height, width } = useWindowSize();
  const [correctFov, setCorrectFov] = useState(0);

  useEffect(() => {
    if (!height || !width) return;

    setCorrectFov(((Math.atan(height / 2 / 600) * 180) / Math.PI) * 2);
  }, [height, width]);

  return (
    <Canvas
      camera={{ fov: correctFov, position: [0, 0, 600], near: 10, far: 1000 }}
    >
      <OrbitControls />
      <Box photoData={photoData} />
    </Canvas>
  );
};

export const HeroHome = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height, width } = useWindowSize();
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!height || !width) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = rect.left - rect.width / 2;
    const y = rect.top - rect.height / 2;

    setPhotoData({ x, y, height, width });
  }, [height, width]);
  return (
    <>
      <div className="h-[100dvh]  z-10 fixed top-0 left-0 right-0">
        <Scene photoData={photoData} />
      </div>
      <div className="h-[calc(100dvh-32px)] flex flex-col justify-between gap-6 pt-10 pb-6">
        <div ref={ref} className="h-full relative opacity-10 ">
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

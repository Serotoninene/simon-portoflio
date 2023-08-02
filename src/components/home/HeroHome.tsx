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

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";

import vertexShader from "@shaders/HomePhotoShader/vertex.glsl";
import fragmentShader from "@shaders/HomePhotoShader/fragment.glsl";
import { useWindowSize } from "@/utils/hooks";
import { useControls } from "leva";

// [X] search for 'type declaration vertexshader glsl'
// [X] make the image cover the plane without losing its aspect ratio
// [X] calculate the camera z position so the units of the canvas match the pixels of the page
// [X] fix the mesh on the html div sizes
// [X] fix the mesh on the html div position
// [X] calculate the ratio of the image to the plane

type PhotoData = { x: number; y: number; width: number; height: number };
type SceneProps = {
  photoData: PhotoData;
};

type BoxProps = {
  photoData: PhotoData;
};

const Box = ({ photoData }: BoxProps) => {
  const { height, width } = useWindowSize();
  const geometryRef = React.useRef() as MutableRefObject<any>;
  const shaderRef = React.useRef() as MutableRefObject<any>;

  const { uProgress } = useControls("webgl", {
    uProgress: { value: 1, min: 0, max: 1, step: 0.1 },
  });

  const controls = useControls("params", {
    uRadius: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
    uIntensity: { value: 10, min: 0, max: 100, step: 0.1 },
  });

  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/photos/00_ACCUEIL.jpeg"
  );

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uQuadSize: {
        value: new THREE.Vector2(photoData.width, photoData.height),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uProgress: { value: uProgress },
      uRadius: { value: controls.uRadius },
      uIntensity: { value: controls.uIntensity },
    }),
    []
  );

  useEffect(() => {
    shaderRef.current.uniforms.uQuadSize.value = new THREE.Vector2(
      photoData.width,
      photoData.height
    );
  }, [width, height]);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();

    shaderRef.current.uniforms.uMouse.value = mouse;
    shaderRef.current.uniforms.uTime.value = time;
    shaderRef.current.uniforms.uProgress.value = uProgress;
    shaderRef.current.uniforms.uRadius.value = controls.uRadius;
    shaderRef.current.uniforms.uIntensity.value = controls.uIntensity;
  });

  return (
    <mesh position={[photoData.x, photoData.y, 0]}>
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
      {/* <OrbitControls /> */}
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

    const x = rect.left - width / 2 + rect.width / 2;
    const y = -rect.top + height / 2 - rect.height / 2;

    setPhotoData({
      x,
      y,
      height: rect?.height,
      width: rect.width,
    });
  }, [height, width]);
  return (
    <>
      <div className="h-[100dvh]  z-10 fixed top-0 left-0 right-0">
        <Scene photoData={photoData} />
      </div>
      <div className="h-[calc(100dvh-32px)] flex flex-col justify-between gap-6 pt-10 pb-6">
        <div ref={ref} className="h-full relative opacity-5">
          <Image
            alt="house in a green field"
            src="/assets/photos/00_ACCUEIL.jpeg"
            onLoad={(e) => {
              // get the aspectRatio of the image
              console.log(e);
            }}
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

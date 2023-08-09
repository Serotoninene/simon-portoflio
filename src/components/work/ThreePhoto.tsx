import { useWindowSize } from "@/utils/hooks";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import fragment from "@shaders/WorkPhotoShader/fragment.glsl";
import vertex from "@shaders/WorkPhotoShader/vertex.glsl";
import { Power3, gsap } from "gsap";

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

export const ThreePhoto = ({ photo }: any) => {
  const shaderRef = useRef<any>();
  const { height, width } = useWindowSize();
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const texture = useTexture(photo.src, () => {}) as THREE.Texture;

  useEffect(() => {
    gsap.to(shaderRef.current, {
      uProgress: 1,
      duration: 0.5,
      delay: 1,
      ease: Power3.easeOut,
    });
  }, []);

  useEffect(() => {
    if (!texture) return;
  }, [texture]);

  useFrame(() => {
    const photoDiv = document.getElementById(photo.alt);
    const rect = photoDiv?.getBoundingClientRect();

    if (!rect) return;
    if (height && width) {
      const x = rect?.left - width / 2 + rect?.width / 2;
      const y = -rect?.top + height / 2 - rect?.height / 2;

      setPhotoData({
        x,
        y: THREE.MathUtils.lerp(photoData.y, y, 0.12),
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
    <mesh position={[photoData.x, photoData.y, 0]}>
      <planeGeometry args={[photoData.width, photoData.height, 1]} />
      {/* @ts-ignore */}
      <colorShiftMaterial ref={shaderRef} uTexture={texture} />
    </mesh>
  );
};

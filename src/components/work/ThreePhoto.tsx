import { useWindowSize } from "@/utils/hooks";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Power3, gsap } from "gsap";

export const ThreePhoto = ({ photo, texture, geometry }: any) => {
  const shaderRef = useRef<any>();
  const { height, width } = useWindowSize();
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    gsap.to(shaderRef.current, {
      uProgress: 1,
      duration: 0.5,
      delay: 1,
      ease: Power3.easeOut,
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
        x: THREE.MathUtils.lerp(photoData.x, x, 0.05),
        y: THREE.MathUtils.lerp(photoData.y, y, 0.1),
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
    <mesh
      position={[photoData.x, photoData.y, 0]}
      geometry={geometry}
      scale={[photoData.width, photoData.height, 1]}
    >
      {/* @ts-ignore */}
      <colorShiftMaterial ref={shaderRef} uTexture={texture} />
    </mesh>
  );
};

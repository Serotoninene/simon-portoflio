import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { CustomCanvas } from "../three";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import vertexShader from "@shaders/HomeFooterShader/vertex.glsl";
import fragmentShader from "@shaders/HomeFooterShader/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useWindowSize } from "@/utils/hooks";

type Props = {
  footerSize: {
    width: number;
    height: number;
  };
};

const OutroScene = ({ footerSize }: Props) => {
  const shaderRef = useRef<any>(null);
  const texture = useTexture(
    "/assets/photos/14_ROOMS_FOR_ME_&_FOR_MY_CAR.jpeg"
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uQuadSize: {
        value: new THREE.Vector2(footerSize.width, footerSize.height),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame(({ clock, mouse }) => {
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.uQuadSize.value = new THREE.Vector2(
      footerSize.width,
      footerSize.height
    );
    shaderRef.current.uniforms.uMouse.value = new THREE.Vector2(
      THREE.MathUtils.mapLinear(mouse.x, -1, 1, 0, 1),
      THREE.MathUtils.mapLinear(mouse.y, -1, 1, 0, 1)
    );
  });

  return (
    <mesh scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2, 4, 4]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const Outro = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [footerSize, setFooterSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setFooterSize({ width, height });
  }, [width, height]);

  return (
    <div ref={ref} className="h-[50vh]">
      <CustomCanvas>
        <OutroScene footerSize={footerSize} />
      </CustomCanvas>
    </div>
  );
};

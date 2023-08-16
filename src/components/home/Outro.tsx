import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { CustomCanvas } from "../three";

import * as THREE from "three";
import { OrbitControls, useTexture } from "@react-three/drei";

import vertexShader from "@shaders/HomeFooterShader/vertex.glsl";
import fragmentShader from "@shaders/HomeFooterShader/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useWindowSize } from "@/utils/hooks";
import { useControls } from "leva";

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

  const { uIntensity, uRadius, uBlurAmount } = useControls({
    uIntensity: {
      value: 0.5,
      min: 0,
      max: 100,
    },
    uRadius: {
      value: 0.1,
      min: 0,
      max: 1,
    },
    uBlurAmount: {
      value: 0.02,
      min: 0,
      max: 1,
    },
  });

  const particleCount = 1000;

  const particles = useMemo(() => {
    const particles = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particles[i] = THREE.MathUtils.randFloatSpread(2);
    }
    return particles;
  }, [particleCount]);

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
      uIntensity: { value: uIntensity },
      uRadius: { value: uRadius },
      uBlurAmount: { value: uBlurAmount },
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

    shaderRef.current.uniforms.uIntensity.value = uIntensity;
    shaderRef.current.uniforms.uRadius.value = uRadius;
    shaderRef.current.uniforms.uBlurAmount.value = uBlurAmount;
  });

  return (
    <mesh scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const Outro = () => {
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
        {/* <OrbitControls /> */}
        <OutroScene footerSize={footerSize} />
      </CustomCanvas>
    </div>
  );
};

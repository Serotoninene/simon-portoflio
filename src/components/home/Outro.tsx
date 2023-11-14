import React, { useEffect, useMemo, useRef, useState } from "react";

import { Linear, Power0, gsap } from "gsap";

import * as THREE from "three";
import { CustomCanvas } from "../three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import TouchTexture from "../three/TouchTexture";
import vertexShader from "@shaders/HomeFooterShader/vertex.glsl";
import fragmentShader from "@shaders/HomeFooterShader/fragment.glsl";

import { useWindowSize } from "@/utils/hooks";

import { useCursorContext } from "../../context/CursorContext";
import { useRouter } from "next/router";
import { useLoadingContext } from "@/context/LoadingContext";
import Link from "next/link";

type Props = {
  footerSize: {
    width: number;
    height: number;
  };
};

const OutroScene = ({ footerSize }: Props) => {
  const meshRef = useRef<any>();
  const shaderRef = useRef<any>(null);
  const router = useRouter();
  const touchTexture = useMemo<any>(() => new TouchTexture(false, 128, 60), []);

  const { setCursorType } = useCursorContext();

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: THREE.Vector2) => {
    touchTexture.addTouch(e);
  };

  const texture = useTexture(
    "/assets/photos/spring/26_REST_AREA.jpeg"
    // "/assets/photos/summer/84_PLANET.jpeg"
    // "/assets/photos/spring/23_GOING_OUT_FOR_DINNER.jpeg"
    // "/assets/photos/autumn/64_WHAT'S_UP.jpeg"
    // "/assets/photos/summer/106_RUNNING_TRACK.jpeg"
    // "/assets/photos/summer/104_FAITH.jpeg"
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
      uTouchTexture: { value: touchTexture.texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 0.5 },
      uRadius: { value: 0.1 },
      uBlurAmount: { value: 0.02 },
      uHoverValue: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    if (hovered) {
      gsap.to(shaderRef.current.uniforms.uHoverValue, {
        value: 1,
        ease: Power0.easeNone,
        duration: 1,
      });
      body.style.cursor = "none";
    } else {
      gsap.to(shaderRef.current.uniforms.uHoverValue, {
        value: 0,
        ease: Linear.easeIn,
        duration: 1,
      });
      body.style.cursor = "auto";
    }
  }, [hovered]);

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

    if (!touchTexture) return;
    touchTexture.update();
    if (hovered) {
      const mappedMouse = new THREE.Vector2(
        THREE.MathUtils.mapLinear(mouse.x, -1, 1, 0, 1),
        THREE.MathUtils.mapLinear(mouse.y, -1, 1, 0, 1)
      );
      handleMouseMove(mappedMouse);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        setHovered(true);
        setCursorType("cta");
      }}
      onPointerLeave={() => {
        setHovered(false);
        setCursorType("pointer");
      }}
      onClick={() => {
        router.push("/work");
        setCursorType("pointer");
      }}
    >
      <planeGeometry
        args={[footerSize.width * 1.35, footerSize.height * 1.35, 128, 128]}
        // i must multiply the width and height by 2 as the canvas is only 50vh and the all fov calculus to base px on ndc is based on 100vh
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

export const Outro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isLoaded } = useLoadingContext();
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
    <div ref={ref} className="relative h-[75vh] mt-10 sm:mt-40">
      <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center sm:hidden">
        <Link href="/work" id="OutroCta" className="rounded-full">
          {" "}
          SEE ALL
        </Link>
      </div>
      <CustomCanvas>
        <OutroScene footerSize={footerSize} />
      </CustomCanvas>
    </div>
  );
};

import React, { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useLoadingContext } from "@/context/LoadingContext";
import { useLocomotiveScroll } from "react-locomotive-scroll";

export const Loader = () => {
  const { progress } = useProgress();
  const { isLoaded } = useLoadingContext();
  const { scroll } = useLocomotiveScroll();

  isLoaded ? scroll.start() : scroll?.stop();

  if (isLoaded) return null;

  return (
    <div className="h-[var(--fullScreen)] w-screen flex justify-center items-center fixed top-0 left-0 bg-light z-20 overflow-hidden text-3xl font-black">
      LOADING{" "}
    </div>
  );
};

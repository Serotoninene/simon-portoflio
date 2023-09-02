import React, { useEffect } from "react";
import { useLoadingContext } from "@/context/LoadingContext";
import { useLocomotiveScroll } from "react-locomotive-scroll";

export const Loader = () => {
  const { isLoaded } = useLoadingContext();
  const { scroll } = useLocomotiveScroll();
  !isLoaded && scroll?.stop();

  useEffect(() => {
    if (isLoaded) {
      scroll?.start();
    }
  }, [isLoaded]);

  if (isLoaded) return null;

  return (
    <div className="h-[var(--fullScreen)] w-screen flex justify-center items-center fixed top-0 left-0 bg-light z-20 overflow-hidden text-3xl font-black">
      LOADING{" "}
    </div>
  );
};

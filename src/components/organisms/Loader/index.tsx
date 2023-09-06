import React, { useEffect } from "react";
import { useLoadingContext } from "@/context/LoadingContext";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { l, o, a, d, i, n, g } from "./paths";

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
      <svg
        viewBox="0 0 56 10" // Set the viewBox to match the original dimensions
        width="20vw"
      >
        <path d={l} />
        <path d={o} />
        <path d={a} />
        <path d={d} />
        <path d={i} />
        <path d={n} />
        <path d={g} />
      </svg>
    </div>
  );
};

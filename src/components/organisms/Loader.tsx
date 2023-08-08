import { useProgress } from "@react-three/drei";
import React from "react";

export const Loader = () => {
  const { progress } = useProgress();
  return (
    <div className="h-[var(--fullScreen)] w-screen flex justify-center items-center">
      {progress}
    </div>
  );
};

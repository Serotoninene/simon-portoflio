import { useProgress } from "@react-three/drei";
import React from "react";

export const Loader = () => {
  const { progress } = useProgress();
  console.log(progress);
  return (
    <div className="h-[var(--fullScreen)] w-screen flex justify-center items-center">
      {progress}
    </div>
  );
};

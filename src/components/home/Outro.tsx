import React from "react";
import { CustomCanvas } from "../three";

type Props = {};

const OutroScene = () => {
  return (
    <mesh scale={[500, 500, 1]}>
      <planeGeometry args={[1, 1, 4, 4]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export const Outro = (props: Props) => {
  return (
    <div className="h-[50vh]">
      <CustomCanvas>
        <OutroScene />
      </CustomCanvas>
    </div>
  );
};

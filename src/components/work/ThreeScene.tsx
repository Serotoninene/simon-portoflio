import { Suspense } from "react";
import { CustomCanvas } from "../three";
import { ThreePhoto } from "./ThreePhoto";
import { ExtendedPhoto } from "@/types";
import { Html } from "@react-three/drei";

type Props = {
  photos: ExtendedPhoto[];
};

const Placeholder = () => {
  return <Html>LOADER</Html>;
};

const Photos = ({ photos }: Props) => {
  return (
    <>
      {photos.map((photo, idx) => (
        <ThreePhoto key={idx} photo={photo} idx={idx} />
      ))}
    </>
  );
};

export const Scene = ({ photos }: Props) => {
  return (
    <CustomCanvas>
      {/* <Perf /> */}
      <Suspense fallback={<Placeholder />}>
        <Photos photos={photos} />
      </Suspense>
    </CustomCanvas>
  );
};

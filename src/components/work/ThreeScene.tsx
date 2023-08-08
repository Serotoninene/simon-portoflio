import { Suspense } from "react";
import { CustomCanvas } from "../three";
import { ThreePhoto } from "./ThreePhoto";
import { ExtendedPhoto } from "@/types";

type Props = {
  photos: ExtendedPhoto[];
};

export const Scene = ({ photos }: Props) => {
  return (
    <CustomCanvas>
      {/* <Perf /> */}
      <Suspense fallback={null}>
        {photos.map((photo, idx) => (
          <ThreePhoto key={idx} photo={photo} idx={idx} />
        ))}
      </Suspense>
    </CustomCanvas>
  );
};

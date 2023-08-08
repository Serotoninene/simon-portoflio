import { CustomCanvas } from "../three";
import { ThreePhoto } from "./ThreePhoto";
import { ExtendedPhoto } from "@/types";

type Props = {
  photos: ExtendedPhoto[];
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
      <Photos photos={photos} />
    </CustomCanvas>
  );
};

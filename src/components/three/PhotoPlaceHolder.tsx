import { ExtendedPhoto } from "@/types";
import { useWindowSize } from "@/hooks";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

type Props = {
  photo: ExtendedPhoto;
};

export const PhotoPlacholder = ({ photo }: Props) => {
  const { height, width } = useWindowSize();
  const [photoData, setPhotoData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useFrame(() => {
    const photoDiv = document.getElementById(photo.alt);
    const rect = photoDiv?.getBoundingClientRect();

    if (!rect) return;
    if (height && width) {
      const x = rect?.left - width / 2 + rect?.width / 2;
      const y = -rect?.top + height / 2 - rect?.height / 2;

      setPhotoData({
        x,
        y: y,
        height: rect?.height,
        width: rect?.width,
      });
    }
  });

  return (
    <mesh position={[photoData.x, photoData.y, 0]}>
      <planeGeometry args={[photoData.width, photoData.height, 1]} />
      <meshBasicMaterial color={photo.dominantColor} />
    </mesh>
  );
};

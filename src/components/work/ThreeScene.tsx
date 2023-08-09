import { ExtendedPhoto } from "@/types";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { CustomCanvas } from "../three";
import { ThreePhoto } from "./ThreePhoto";

import * as THREE from "three";

import fragment from "@shaders/WorkPhotoShader/fragment.glsl";
import vertex from "@shaders/WorkPhotoShader/vertex.glsl";
type Props = {
  photos: ExtendedPhoto[];
};

const ColorShiftMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTextureSize: new THREE.Vector2(0, 0),
    uQuadSize: new THREE.Vector2(0, 0),
    uProgress: 0,
  },
  vertex,
  fragment
);
extend({ ColorShiftMaterial });

const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

const Photos = ({ photos }: Props) => {
  const textures = useTexture(photos.map((photo) => photo.src));

  return (
    <>
      {photos.map((photo, idx) => (
        <ThreePhoto
          key={idx}
          photo={photo}
          idx={idx}
          geometry={geometry}
          texture={textures[idx]}
        />
      ))}
    </>
  );
};

export const Scene = ({ photos }: Props) => {
  return (
    <CustomCanvas>
      <Perf />
      <Photos photos={photos} />
    </CustomCanvas>
  );
};

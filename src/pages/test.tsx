import React from "react";

import { photos } from "./work";

type Props = {};

export default function test(props: Props) {
  return (
    <div className="grid grid-cols-6">
      {photos.map((photo) => (
        <div key={photo.alt} className="p-6 overflow-hidden">
          <img src={photo.src} alt={photo.alt} className="w-full" />
        </div>
      ))}
    </div>
  );
}

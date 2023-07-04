import React from "react";
import Image from "next/image";

import { spartan } from "@/app/layout";
type Props = {};

export const HeroHome = (props: Props) => {
  return (
    <div className="h-[calc(100dvh-32px)] flex flex-col justify-between gap-6 pt-6 pb-6">
      <div className="h-full relative">
        <Image
          alt="house in a green field"
          src="/assets/photos/house_home.webp"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex justify-between items-end">
        <h2 className="pb-1">
          Hi, here is an overview of <br />
          my personal artistic work.
        </h2>
        <h1
          className={`${spartan.className} text-[64px] align-bottom leading-none`}
        >
          SIMON EYCHENNE
        </h1>
      </div>
    </div>
  );
};

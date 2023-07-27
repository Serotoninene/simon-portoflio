import React from "react";
import Image from "next/image";
import { spartan } from "../molecules/Layout";

// import { spartan } from "@/app/layout";
type Props = {};

export const HeroHome = (props: Props) => {
  return (
    <div className="h-[calc(100dvh-32px)] flex flex-col justify-between gap-6 pt-10 pb-6">
      <div className="h-full relative">
        <Image
          alt="house in a green field"
          src="/assets/photos/00_ACCUEIL.jpeg"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="sm:flex justify-between items-end">
        <h2 className="hidden md:block pb-1">
          Hi, here is an overview of <br />
          my personal artistic work.
        </h2>
        <h1
          className={`${spartan.className} text-end flex-none text-2xl align-bottom leading-none sm:flex-1 sm:text-[64px]`}
        >
          SIMON EYCHENNE
        </h1>
      </div>
    </div>
  );
};

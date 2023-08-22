import React from "react";

import { AnimatedWords } from "../atoms";
import AnimatedLetters from "../atoms/AnimLetters";

type Props = {};

export const About = (props: Props) => {
  return (
    <div className="grid gap-8 sm:grid-cols-8 ">
      <div className="col-span-3 font-black text-4xl leading-[150%]">
        <AnimatedLetters
          string="What is supposed to be photogenic does not interest me as much as its
        inherent beauty."
          fontWeight="font-black"
          stagger={0.02}
          delay={1}
        />
      </div>
      <div />

      <div className="col-span-2 font-medium text-justify flex items-end sm:text-lg">
        {" "}
        It is more intriguing to me to offer a unique and original composition
        of something that is ultimately ordinary.{" "}
      </div>
      <div className="col-span-2 font-medium text-justify flex items-end sm:text-lg">
        Without pretension, I would like to pay tribute here to all objects, all
        bodies, all gestures, all buildings, and all the details that have
        inspired me at the moment when we crossed paths somewhere.
      </div>
    </div>
  );
};

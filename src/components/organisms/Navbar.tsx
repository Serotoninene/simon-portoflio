"use client";

import React, { useEffect, useState } from "react";

import { Container } from "../molecules/Container";
import { AnimLink } from "../atoms";

type Props = {};

// [] the navbar disappears when scrolling down
// [] the navbar appears when scrolling up
// [] the animation doesn't trigger when on mobile

export const Navbar = (props: Props) => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      setScrollDir("down");
    } else {
      setScrollDir("up");
    }
  };

  useEffect(() => {
    const container = document.querySelector("body");
    container?.addEventListener("wheel", handleWheel);

    return document.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <Container className="fixed left-0 right-0 z-10">
      <ul className="hidden sm:flex justify-end gap-14 font-semi-bold">
        <li>
          <AnimLink href="/work">work</AnimLink>
        </li>
        <li>
          <AnimLink>about me</AnimLink>
        </li>
        <li>
          <AnimLink>instagram</AnimLink>
        </li>
      </ul>
      <ul className="flex sm:hidden flex-col justify-center items-end h-6 gap-1">
        <li className="w-5 h-[1px] bg-black rounded"></li>
        <li className="w-5 h-[1px] bg-black rounded"></li>
      </ul>
    </Container>
  );
};

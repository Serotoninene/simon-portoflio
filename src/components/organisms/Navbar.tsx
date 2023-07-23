"use client";

import React, { useEffect, useState } from "react";

import { AnimLink } from "../atoms";
import { Container } from "../molecules";
import { motion } from "framer-motion";

type Props = {};

const containerAnim = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
  shown: {
    transition: {
      staggerChildren: 0.05,
      ease: "easeIn",
    },
  },
};

const linkAnim = {
  hidden: { y: "-100%" },
  shown: { y: 0 },
};

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
      <motion.ul
        initial="hidden"
        animate={scrollDir === "down" ? "hidden" : "shown"}
        exit="hidden"
        variants={containerAnim}
        className="hidden overflow-hidden sm:flex justify-end gap-14 font-semi-bold"
      >
        <motion.li variants={linkAnim}>
          <AnimLink href="/work">work</AnimLink>
        </motion.li>
        <motion.li variants={linkAnim}>
          <AnimLink>about me</AnimLink>
        </motion.li>
        <motion.li variants={linkAnim}>
          <AnimLink>instagram</AnimLink>
        </motion.li>
      </motion.ul>
      <ul className="flex sm:hidden flex-col justify-center items-end h-6 gap-1">
        <li className="w-5 h-[1px] bg-black rounded"></li>
        <li className="w-5 h-[1px] bg-black rounded"></li>
      </ul>
    </Container>
  );
};

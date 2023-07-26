"use client";

import React, { useEffect, useState } from "react";

import { AnimLink } from "../atoms";
import { Container } from "../molecules";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type NavLink = {
  href: string;
  title: string;
};

type Props = {
  navLinks: NavLink[];
  isMenuOpen: boolean;
  setIsMenuOpen: (e: boolean) => void;
};

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

const navLinks = [
  { href: "/work", title: "work" },
  { href: "/", title: "home" },
  { href: "instagram", title: "instagram" },
];

// [] find a better easing

export const Menu = ({ navLinks, isMenuOpen, setIsMenuOpen }: Props) => {
  const path = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? 0 : "-100%" }}
      transition={{ ease: "easeOut" }}
      className="fixed sm:hidden top-0 left-0 right-0 bottom-0 bg-light"
    >
      <div
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        Menu
      </div>
      <ul>
        {navLinks.map((navLink, idx) => (
          <motion.li key={idx} variants={linkAnim}>
            <AnimLink href={navLink.href}>{navLink.title}</AnimLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      setScrollDir("down");
    } else {
      setScrollDir("up");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const container = document.querySelector("body");
    container?.addEventListener("wheel", handleWheel);

    return document.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <Container className="fixed left-0 right-0 z-10 pt-4">
      <motion.ul
        initial="hidden"
        animate={scrollDir === "down" ? "hidden" : "shown"}
        exit="hidden"
        variants={containerAnim}
        className="hidden overflow-hidden sm:flex justify-end gap-14 font-semi-bold"
      >
        {navLinks.map((navLink, idx) => (
          <motion.li key={idx} variants={linkAnim}>
            <AnimLink href={navLink.href}>{navLink.title}</AnimLink>
          </motion.li>
        ))}
      </motion.ul>
      {/*  burger button */}
      <ul
        onClick={toggleMenu}
        className="flex sm:hidden flex-col justify-center items-end h-6 gap-1"
      >
        <li className="w-5 h-[1px] bg-black rounded"></li>
        <li className="w-5 h-[1px] bg-black rounded"></li>
      </ul>
      {/* menu for mobile */}
      <Menu
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </Container>
  );
};

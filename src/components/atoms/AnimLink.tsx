"use client";

import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
};

const containerAnim = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterAnim = {

export const AnimLink = ({ children, href = "/" }: Props) => {
  const words = children?.toString().split(" ");

  return (
    <Link href={href} className="cursor-pointer">
      {words?.map((word) => (
        <span key={word}>
          {[...word].map((letter, idx) => (
            <motion.span key={letter + idx} className="inline-block">
              {letter}
            </motion.span>
          ))}{" "}
        </span>
      ))}
    </Link>
  );
};

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import { AnimatedLetters } from "@/components/atoms";
import { Container } from "@/components/molecules";
import { useCursorContext } from "@/context/CursorContext";
import simonPortrait from "@public/assets/photos/000_BIO.jpeg";

const navLinks = [
  { href: "/", title: "home" },
  { href: "/work", title: "work" },
  { href: "/contact", title: "contact" },
];

export default function Contact() {
  const { setCursorType } = useCursorContext();

  const contactInfo = [
    {
      label: "gram",
      content: "@uma",
      href: "#",
    },
    { label: "phone", content: "06 05 03 99 39" },
    {
      label: "mail",
      content: "simeychenne@gmail.fr",
    },
  ];

  const handleMouseOver = () => {
    setCursorType("hover");
  };

  const handleMouseLeave = () => {
    setCursorType("pointer");
  };

  return (
    <Container className="bg-light h-[var(--fullScreen)]">
      <div className="flex flex-col justify-between gap-8 h-full pt-14 pb-8 sm:grid sm:grid-cols-5 sm:pt-16 sm:pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-full sm:col-span-3"
        >
          <Image
            src={simonPortrait}
            className="object-cover"
            alt="dans le miroir"
            placeholder="blur"
            fill
          />
        </motion.div>
        <div className="flex justify-center items-center sm:col-span-2">
          <ul className="w-full font-normal px-4 sm:w-auto">
            {contactInfo.map((item, idx) => (
              <li
                className="flex justify-between sm:text-center sm:block"
                key={item.label}
              >
                <div className="font-normal italic sm:hidden">{item.label}</div>
                {item.href ? (
                  <Link
                    href={item.href}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                  >
                    <AnimatedLetters string={item.content} delay={idx * 0.1} />
                  </Link>
                ) : (
                  <AnimatedLetters string={item.content} delay={idx * 0.1} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

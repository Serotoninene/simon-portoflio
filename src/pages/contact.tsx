import { Container } from "@/components/molecules";
import { useCursorContext } from "@/context/CursorContext";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
  { href: "/", title: "home" },
  { href: "/work", title: "work" },
  { href: "/contact", title: "contact" },
];

export default function Contact() {
  const { setCursorType } = useCursorContext();
  return (
    <Container className="bg-light h-[var(--fullScreen)]">
      <div className="flex flex-col justify-between gap-8 h-full pt-14 pb-8 sm:grid sm:grid-cols-5 sm:pt-16 sm:pb-10">
        <div className="relative h-full sm:col-span-3">
          <Image
            src="/assets/photos/000_BIO.jpeg"
            className="object-cover"
            alt="dans le miroir"
            fill
          />
        </div>
        <div className="flex justify-center items-center sm:col-span-2">
          <ul className="w-full font-normal px-4 sm:w-auto">
            <li className="flex justify-between sm:text-center sm:block">
              <div className="font-normal italic sm:hidden">gram</div>
              <Link
                href="#"
                onMouseOver={() => {
                  setCursorType("hover");
                }}
                onMouseLeave={() => {
                  setCursorType("pointer");
                }}
              >
                @uma
              </Link>
            </li>
            <li className="flex justify-between sm:text-center sm:block">
              <div className="font-normal italic sm:hidden">phone</div>
              <div>06 05 03 99 39</div>
            </li>
            <li className="flex justify-between sm:text-center sm:block">
              <div className="font-normal italic sm:hidden">mail</div>
              <div>simeychenne@gmail.fr</div>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

import React from "react";

import { Container } from "../molecules/Container";
import { AnimLink } from "../atoms";

type Props = {};

export const Navbar = (props: Props) => {
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

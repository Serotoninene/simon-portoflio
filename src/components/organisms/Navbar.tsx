import React from "react";
import { spartan } from "@/app/layout";

import { Container } from "../molecules/Container";
import { AnimLink } from "../atoms";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <Container className="fixed left-0 right-0">
      <ul className="flex justify-end gap-14 font-semi-bold">
        <li>
          <AnimLink>work</AnimLink>
        </li>
        <li>
          <AnimLink>about me</AnimLink>
        </li>
        <li>
          <AnimLink>instagram</AnimLink>
        </li>
      </ul>
    </Container>
  );
};

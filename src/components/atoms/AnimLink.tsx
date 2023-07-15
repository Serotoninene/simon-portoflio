import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
};

export const AnimLink = ({ children, href = "/" }: Props) => {
  return (
    <Link href={href} className="cursor-pointer">
      {children}
    </Link>
  );
};

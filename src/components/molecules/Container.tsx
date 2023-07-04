import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return <main className={`px-5 sm:px-10 py-4 ${className}`}>{children}</main>;
};

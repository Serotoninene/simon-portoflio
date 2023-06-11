import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return <main className={`px-5 py-4 ${className}`}>{children}</main>;
};

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return <div className={`px-10 py-6 ${className}`}>{children}</div>;
};

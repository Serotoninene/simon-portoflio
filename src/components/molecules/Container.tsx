import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type HomeContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children, className }: Props) => {
  return <main className={`px-5 sm:px-10 py-4 ${className}`}>{children}</main>;
};

export const HomeContainer = ({ children }: HomeContainerProps) => (
  <div className="py-6 h-[100dvh]">{children}</div>
);

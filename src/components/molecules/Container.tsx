import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type HomeContainerProps = {
  children: React.ReactNode;
  fit?: boolean;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div data-scroll-section className={`px-5 sm:px-10 pt-4 ${className}`}>
      {children}
    </div>
  );
};

export const HomeContainer = ({ children, fit }: HomeContainerProps) => (
  <div className={`py-6 ${fit ? "h-auto" : "h-[100dvh]"}`}>{children}</div>
);

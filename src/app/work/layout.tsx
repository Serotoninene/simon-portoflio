import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <div className="h-[calc(100dvh-32px)] pt-8">{children}</div>;
}

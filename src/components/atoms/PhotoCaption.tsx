import React from "react";

type Props = {};

export const PhotoCaption = (props: Props) => {
  return (
    <div className="flex justify-between sm:justify-start gap-2">
      <h3 className="font-bold text-5xl sm:text-6xl">01</h3>
      <div className="flex flex-col justify-between pt-0.5">
        <h4 className="text-lg text-end sm:text-start sm:text-xl">
          MY GARDEN IS COOL.
        </h4>
        <p className="pb-0.5 text-end sm:text-start">
          2021, Canary Islands (ES).
        </p>
      </div>
    </div>
  );
};

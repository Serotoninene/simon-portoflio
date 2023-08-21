import React, { createContext, useContext, useMemo, useState } from "react";
import { Flip } from "gsap/dist/Flip";

type OverviewProviderProps = {
  children: React.ReactNode;
};

type OverviewContextProps = {
  isOverview: boolean;
  flipState: any;
  handleOverviewSwitch: (overviewState: boolean) => void;
};

export const OverviewContext = createContext<OverviewContextProps>({
  isOverview: false,
  flipState: null,
  handleOverviewSwitch: () => {},
});

export const OverviewProvider = ({ children }: OverviewProviderProps) => {
  const [flipState, setFlipState] = useState<any>();
  const [isOverview, setIsOverview] = useState(false);

  const handleOverviewSwitch = (overviewState: boolean) => {
    setFlipState(Flip.getState(".gallery-photo, .lazy-container, .lazy-photo"));
    setIsOverview(overviewState);
  };

  const value = useMemo(
    () => ({
      isOverview,
      flipState,
      handleOverviewSwitch,
    }),
    [isOverview, flipState]
  );

  return (
    <OverviewContext.Provider value={value}>
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverviewContext = () => {
  const context = useContext(OverviewContext);
  if (context === undefined) {
    throw new Error(
      "useOverviewContext must be used within a OverviewProvider"
    );
  }
  return context;
};

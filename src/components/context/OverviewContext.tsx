import React, { createContext, useContext, useMemo, useState } from "react";

type OverviewProviderProps = {
  children: React.ReactNode;
};

type OverviewContextProps = {
  isOverview: boolean;
  setIsOverview: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OverviewContext = createContext<OverviewContextProps>({
  isOverview: false,
  setIsOverview: () => {},
});

export const OverviewProvider = ({ children }: OverviewProviderProps) => {
  const [isOverview, setIsOverview] = useState(false);

  const value = useMemo(
    () => ({
      isOverview,
      setIsOverview,
    }),
    [isOverview]
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

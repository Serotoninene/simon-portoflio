import React, { createContext, useContext, useMemo, useState } from "react";

type OverviewProviderProps = {
  children: React.ReactNode;
};

type OverviewContextProps = {
  isOverview: boolean;
  setIsOverview: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  loadingCount: number;
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>;
};

export const OverviewContext = createContext<OverviewContextProps>({
  isOverview: false,
  setIsOverview: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
  loadingCount: 0,
  setLoadingCount: () => {},
});

export const OverviewProvider = ({ children }: OverviewProviderProps) => {
  const [isOverview, setIsOverview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const value = useMemo(
    () => ({
      isOverview,
      setIsOverview,
      isLoaded,
      setIsLoaded,
      loadingCount,
      setLoadingCount,
    }),
    [loadingCount, isOverview, isLoaded]
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

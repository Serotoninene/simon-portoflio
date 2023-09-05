import React, { createContext, useContext, useMemo, useState } from "react";

export const LoadingContext = createContext<{
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoaded: false,
  setIsLoaded: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const value = useMemo(
    () => ({
      isLoaded,
      setIsLoaded,
    }),
    [isLoaded]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};

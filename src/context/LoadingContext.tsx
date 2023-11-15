import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const LoadingContext = createContext<{
  isLoaded: boolean;
  setLoadedRatio: React.Dispatch<React.SetStateAction<number>>;
}>({
  isLoaded: false,
  setLoadedRatio: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadedRatio, setLoadedRatio] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadedRatio === 1) setIsLoaded(true);
  }, [loadedRatio]);

  const value = useMemo(
    () => ({
      isLoaded,
      setLoadedRatio,
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

import React, { useState, createContext, useMemo, useContext } from "react";

type Props = {
  children: JSX.Element;
};

export const CursorContext = createContext<any>("pointer");

export function CursorProvider({ children }: Props) {
  const [cursorType, setCursorType] = useState<"hover" | "pointer" | "cta">(
    "pointer"
  );

  const contextValue = useMemo(() => {
    return { cursorType, setCursorType };
  }, [cursorType]);

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
};

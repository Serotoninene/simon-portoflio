import { useState, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

function useIsMobile() {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!width) return;
    setIsMobile(width < 640);
  }, [width]);

  return isMobile;
}

export default useIsMobile;

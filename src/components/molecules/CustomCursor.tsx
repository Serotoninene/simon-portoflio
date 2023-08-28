import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
// Context
import { useCursorContext } from "@components/context/CursorContext";
import { useMediaQuery } from "@utils/hooks";
import AnimatedLetters from "../atoms/AnimLetters";

export default function CustomCursor() {
  const onMobile = useMediaQuery(640);

  const { cursorType } = useCursorContext();

  const mousePosition = {
    x: useMotionValue(200),
    y: useMotionValue(200),
  };

  // const [mousePosition, setMousePosition] = useState({
  //   x: 200,
  //   y: 200,
  // });

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    mousePosition.x.set(clientX);
    mousePosition.y.set(clientY);
    // setMousePosition({
    //   x,
    //   y,
    // });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      id="CustomCursor" // had to use css for styling here --> base.scss
      className={cursorType}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        damping: 100,
        mass: 0.25,
        stiffness: 1000,
      }}
    >
      {cursorType === "cta" && (
        <AnimatedLetters key="cta" delay={0} string="SEE ALL" />
      )}
    </motion.div>
  );
}

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// Context
import { useCursorContext } from "@components/context/CursorContext";
import AnimatedLetters from "../atoms/AnimLetters";

export default function CustomCursor() {
  const { cursorType } = useCursorContext();

  const springConfig = {
    stiffness: 500,
    damping: 15,
    mass: 0.5,
  };

  const mousePosition = {
    x: useSpring(200, springConfig),
    y: useSpring(200, springConfig),
  };

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    mousePosition.x.set(clientX - 10);
    mousePosition.y.set(clientY - 10);
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
        scale: cursorType === "hover" ? 0.5 : 1,
      }}
    >
      {cursorType === "cta" && (
        <AnimatedLetters key="cta" delay={0} string="SEE ALL" />
      )}
    </motion.div>
  );
}

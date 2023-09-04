import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Context
import { useCursorContext } from "@/context/CursorContext";
import AnimatedLetters from "../atoms/AnimLetters";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorType } = useCursorContext();

  // COMMENTED ALL THE LOGIC ANIMATING THE CURSOR WITH FRAMER MOTION -- TOO DEMANDING IN PERFORMANCE BUT PERHAPS IMPROVABLE
  // const springConfig = {
  //   stiffness: 500,
  //   damping: 15,
  //   mass: 0.5,
  // };

  // const mousePosition = {
  //   x: useSpring(200, springConfig),
  //   y: useSpring(200, springConfig),
  // };

  const onMouseMove = (event: MouseEvent) => {
    if (!cursorRef.current) return;
    const { clientX, clientY } = event;
    cursorRef.current.style.top = `${clientY - 10}px`;
    cursorRef.current.style.left = `${clientX - 10}px`;
    // mousePosition.x.set(clientX - 10);
    // mousePosition.y.set(clientY - 10);
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
      ref={cursorRef}
      className={cursorType}
      style={{
        // x: mousePosition.x,
        // y: mousePosition.y,
        scale: cursorType === "hover" ? 0.5 : 1,
      }}
    >
      {cursorType === "cta" && (
        <AnimatedLetters key="cta" delay={0} string="SEE ALL" />
      )}
    </motion.div>
  );
}

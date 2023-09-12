import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Context
import { useCursorContext } from "@/context/CursorContext";
import AnimatedLetters from "../atoms/AnimLetters";
import { useWindowSize } from "@/utils/hooks";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorType } = useCursorContext();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const onMouseMove = (event: MouseEvent) => {
    if (!cursorRef.current) return;

    const { clientX, clientY } = event;

    // Update the current cursor position
    setMousePosition({
      x: clientX - 10,
      y: clientY - 10,
    });
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
        scale: cursorType === "hover" ? 0.5 : 1,
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      {cursorType === "cta" && (
        <AnimatedLetters key="cta" delay={0} string="SEE ALL" />
      )}
    </motion.div>
  );
}

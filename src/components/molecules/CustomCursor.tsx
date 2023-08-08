import { useEffect, useState, useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
// Context
import { useCursorContext } from "@components/context/CursorContext";
import { useMediaQuery } from "@utils/hooks";

export default function CustomCursor() {
  const onMobile = useMediaQuery(640);

  const { cursorType } = useCursorContext();
  const [mousePosition, setMousePosition] = useState({
    x: 200,
    y: 200,
  });

  const onMouseMove = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({
      x,
      y,
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
      className={onMobile ? "opacity-0" : ""}
      style={{
        scale: cursorType === "hover" ? 0.3 : 1,
        backgroundColor: cursorType === "hover" ? "#071732" : "transparent",
      }}
      animate={{
        top: mousePosition.y - 20,
        left: mousePosition.x - 20,
      }}
      transition={{
        type: "spring",
        damping: 10,
        mass: 0.01,
        stiffness: 500,
        velocity: 10,
      }}
    ></motion.div>
  );
}

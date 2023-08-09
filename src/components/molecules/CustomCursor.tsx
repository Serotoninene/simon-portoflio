import { useEffect, useState, useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
// Context
import { useCursorContext } from "@components/context/CursorContext";
import { useMediaQuery } from "@utils/hooks";
import { useControls } from "leva";

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

  // const { damping, mass, stiffness } = useControls({
  //   damping: {
  //     value: 1,
  //     min: 0,
  //     max: 100,
  //     step: 0.01,
  //   },
  //   mass: {
  //     value: 0.1,
  //     min: 0,
  //     max: 10,
  //     step: 0.01,
  //   },
  //   stiffness: {
  //     value: 1000,
  //     min: 0,
  //     max: 10000,
  //     step: 1,
  //   },
  // });

  return (
    <>
      <motion.div
        id="CustomCursor" // had to use css for styling here --> base.scss
        className={onMobile ? "opacity-0" : ""}
        style={{
          scale: cursorType === "hover" ? 0.3 : 1,
          backgroundColor: "#071732",
        }}
        animate={{
          top: mousePosition.y - 5,
          left: mousePosition.x - 5,
        }}
        transition={{
          type: "spring",
          damping: 38,
          mass: 0.1,
          stiffness: 500,
          // velocity: 10,
        }}
      ></motion.div>
      <motion.div
        id="InnerCustomCursor" // had to use css for styling here --> base.scss
        className={onMobile ? "opacity-0" : ""}
        style={{
          scale: cursorType === "hover" ? 0.3 : 1,
          backgroundColor: "#071732",
        }}
        animate={{
          top: mousePosition.y - 2.5,
          left: mousePosition.x - 2.5,
        }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.1,
          stiffness: 500,
          // velocity: 10,
        }}
      ></motion.div>
    </>
  );
}

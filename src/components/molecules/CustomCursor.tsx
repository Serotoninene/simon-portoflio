import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
          scale: cursorType === "hover" ? 0.5 : 1,
          backgroundColor: "white",
        }}
        animate={{
          top: mousePosition.y - 10,
          left: mousePosition.x - 10,
        }}
        transition={{
          type: "spring",
          damping: 38,
          mass: 0.1,
          stiffness: 500,
          // velocity: 10,
        }}
      ></motion.div>
    </>
  );
}

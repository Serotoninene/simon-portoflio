import { AnimatePresence, motion } from "framer-motion";
import AnimatedLetters from "../atoms/AnimLetters";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";
import { Power3 } from "gsap";
import { Flip } from "gsap/dist/Flip";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
    },
  },
};

export const WorkFooter = ({ title }: any) => {
  const { isOverview, handleOverviewSwitch } = useOverviewContext();
  const { setCursorType } = useCursorContext();

  const handleOverview = () => {
    handleOverviewSwitch(true);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div
      data-scroll
      data-scroll-sticky
      data-scroll-target="#scroll-container"
      className={`flex items-end fixed left-0 top-0 h-[100vh] py-4 px-10 w-full ${
        isOverview ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <AnimatePresence mode="popLayout">
        <div className="flex justify-between items-center w-full mix-blend-difference">
          <motion.div
            key={title}
            variants={variants}
            initial="hidden"
            animate={isOverview ? "hidden" : "visible"}
            exit="hidden"
            className="font-bold"
          >
            {title}{" "}
          </motion.div>
          <div
            className="cursor-pointer"
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("pointer")}
            onClick={handleOverview}
          >
            <AnimatedLetters
              string="See all photos"
              stagger={0.01}
              rotate={15}
              duration={0.4}
              y={100}
              start={!isOverview}
            />
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

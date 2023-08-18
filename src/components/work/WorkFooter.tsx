import { AnimatePresence, motion } from "framer-motion";
import AnimatedLetters from "../atoms/AnimLetters";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";

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

const groups = ["summer", "autumn", "winter", "spring"];

export const WorkFooter = ({ title, photoGroup, setPhotoGroup }: any) => {
  const { isOverview, handleOverviewSwitch } = useOverviewContext();
  const { setCursorType } = useCursorContext();

  const handleOverview = () => {
    handleOverviewSwitch(true);
  };

  return (
    <div
      className={`flex items-end relative left-0 top-0 h-0 z-10 py-4 px-10 w-full mix-blend-difference ${
        isOverview ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {" "}
      <AnimatePresence mode="popLayout">
        <div className="fixed bottom-4 left-10 right-10 flex justify-between items-center text-light">
          <motion.div
            key={title}
            variants={variants}
            initial="hidden"
            animate={isOverview ? "hidden" : "visible"}
            exit="hidden"
            className="font-bold"
          >
            <span className=" text-light">{title} </span>
          </motion.div>
          <div
            className="cursor-pointer flex items-end gap-10"
            onClick={handleOverview}
          >
            <ul>
              {groups.map((group) => (
                <li
                  key={group}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("pointer")}
                  onClick={() => setPhotoGroup(group)}
                  className={`${group === title ? "text-light" : "text-dark"}`}
                >
                  {group}
                </li>
              ))}
            </ul>
            <div
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("pointer")}
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
        </div>
      </AnimatePresence>
    </div>
  );
};

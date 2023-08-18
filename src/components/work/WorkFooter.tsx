import { AnimatePresence, motion } from "framer-motion";
import AnimatedLetters from "../atoms/AnimLetters";
import { useOverviewContext } from "../context/OverviewContext";
import { useCursorContext } from "../context/CursorContext";
import { MouseEvent, useState } from "react";
import { isConstructorDeclaration } from "typescript";

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

const containerTransition = {
  staggerChildren: 0.05,
  delayChildren: 0.1,
};

const variantsContainer = {
  hidden: { transition: containerTransition }, // this is needed to avoid a bug with the exit animation
  visible: { transition: containerTransition },
};

const groups = ["summer", "autumn", "winter", "spring"];

export const GroupElement = ({
  idx,
  handleClick,
  group,
  photoGroup,
  isActive,
}: any) => {
  const { setCursorType } = useCursorContext();

  const groupActive = photoGroup === group;

  const variantsItem = {
    hidden: {
      opacity: 0,
      y: "100%",
      transition: { ease: "easeOut", duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.2, delay: idx * 0.06 },
    },
  };

  if (!isActive && !groupActive) return null;

  return (
    <motion.li
      layout
      key={group}
      variants={variantsItem}
      initial={"hidden"}
      animate="visible"
      exit={"hidden"}
      onMouseEnter={() => isActive && setCursorType("hover")}
      onMouseLeave={() => setCursorType("pointer")}
      onClick={(e) => {
        handleClick(group, e);
      }}
      className={groupActive ? "font-black order-1" : ""}
    >
      {group}
    </motion.li>
  );
};
export const GroupSelector = ({ photoGroup, setPhotoGroup }: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (group: string, e: MouseEvent) => {
    e.stopPropagation();
    if (group === photoGroup) {
      setIsActive((prev) => !prev);
    } else {
      isActive && setPhotoGroup(group);
      setIsActive(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <ul
        key={isActive.toString()}
        className="flex flex-col items-start w-20 gap-1"
      >
        {groups.map((group, idx) => (
          <GroupElement
            key={group}
            idx={idx}
            group={group}
            isActive={isActive}
            photoGroup={photoGroup}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </AnimatePresence>
  );
};

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
        <div className="fixed bottom-4 left-10 right-10 flex justify-between items-end text-light">
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
          <div className="flex items-end gap-40" onClick={handleOverview}>
            <motion.div
              variants={variants}
              initial="hidden"
              animate={isOverview ? "hidden" : "visible"}
              exit="hidden"
            >
              <GroupSelector
                photoGroup={photoGroup}
                setPhotoGroup={setPhotoGroup}
              />
            </motion.div>
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

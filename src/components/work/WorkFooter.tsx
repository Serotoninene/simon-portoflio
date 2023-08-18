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
  staggerChildren: 0.5,
  delayChildren: 0.1,
};

const variantsContainer = {
  hidden: { transition: containerTransition }, // this is needed to avoid a bug with the exit animation
  visible: { transition: containerTransition },
};

const groups = ["summer", "autumn", "winter", "spring"];

export const GroupElement = ({
  handleClick,
  group,
  photoGroup,
  isActive,
}: any) => {
  const { setCursorType } = useCursorContext();

  const groupActive = photoGroup === group;

  const variantsItem = {
    hidden: { opacity: 0, y: "100%" },
    visible: (custom: boolean) => ({
      opacity: isActive || groupActive ? 1 : 0,
      y: isActive || groupActive ? 0 : "100%",
    }),
  };

  return (
    <motion.li
      variants={variantsItem}
      onMouseEnter={() => isActive && setCursorType("hover")}
      onMouseLeave={() => setCursorType("pointer")}
      onClick={(e) => {
        handleClick(group, e);
      }}
      className={photoGroup === group ? "font-bold order-1" : ""}
    >
      {group}
    </motion.li>
  );
};
export const GroupSelector = ({ photoGroup, setPhotoGroup }: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (group: string, e: MouseEvent) => {
    e.stopPropagation();
    console.log("group from array", group);
    console.log("photoGroup", photoGroup);
    if (group === photoGroup) {
      console.log("same group");
      setIsActive((prev) => !prev);
    } else {
      isActive && setPhotoGroup(group);
    }
  };

  return (
    <motion.ul
      variants={variantsContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-1"
    >
      {groups.map((group) => (
        <div key={group} className={photoGroup === group ? "order-2 z-10" : ""}>
          <GroupElement
            group={group}
            isActive={isActive}
            photoGroup={photoGroup}
            handleClick={handleClick}
          />
        </div>
      ))}
    </motion.ul>
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

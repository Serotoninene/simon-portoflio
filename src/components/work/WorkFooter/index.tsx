import { AnimatePresence, motion } from "framer-motion";
import AnimatedLetters from "../../atoms/AnimLetters";
import { useOverviewContext } from "../../../context/OverviewContext";
import { useCursorContext } from "../../../context/CursorContext";
import { MouseEvent, useState } from "react";
import { fadeOut, fadeTranslateOut } from "./anims";
import { SVGButtons } from "../SVGButtons";

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

  // show the groupActive all the time and the other when isActive === true
  if (!isActive && !groupActive) return null;

  return (
    <motion.li
      key={group}
      variants={fadeTranslateOut}
      initial={groupActive ? "visible" : "hidden"}
      custom={idx}
      animate="visible"
      exit={groupActive ? "visible" : "hidden"}
      onMouseEnter={() => setCursorType("hover")}
      onMouseLeave={() => setCursorType("pointer")}
      onClick={(e) => {
        handleClick(group, e);
      }}
      className={
        groupActive ? "font-black order-1 cursor-pointer" : "cursor-pointer"
      }
    >
      {group}
    </motion.li>
  );
};
export const GroupSelector = ({ photoGroup, setPhotoGroup }: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (group: string, e: MouseEvent) => {
    e.stopPropagation();
    if (group !== photoGroup) {
      if (isActive) {
        setIsActive(false);
        setPhotoGroup(group);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <ul
        key={isActive.toString()}
        onMouseEnter={() => {
          if (!isActive) {
            setIsActive(true);
          }
        }}
        onMouseLeave={() => {
          if (isActive) {
            setIsActive(false);
          }
        }}
        className="flex flex-col items-end w-20 gap-1"
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
            variants={fadeOut}
            initial="hidden"
            animate={isOverview ? "hidden" : "visible"}
            exit="hidden"
            className="font-bold w-1/2 leading-[1.1] sm:width-auto"
          >
            <span className="text-light">{title} </span>
          </motion.div>
          <div
            className="flex flex-col items-end sm:flex-row sm:gap-40"
            onClick={handleOverview}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOverview ? 0 : 1 }}
            >
              <GroupSelector
                photoGroup={photoGroup}
                setPhotoGroup={setPhotoGroup}
              />
            </motion.div>
            <div
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("pointer")}
              className="cursor-pointer"
            >
              <SVGButtons />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

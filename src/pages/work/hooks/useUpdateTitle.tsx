import { useEffect, useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { PhotoInfo } from "../types/types";
import { photos } from "@/data/photos";
import { ExtendedPhoto } from "@/types";

type Props = {
  photoGroup: "summer" | "autumn" | "winter" | "spring";
};

const useUpdateTitle = ({ photoGroup }: Props) => {
  const [photosDisplayed, setPhotosDisplayed] = useState<ExtendedPhoto[]>([]);

  const [infos, setInfos] = useState<PhotoInfo>({
    title: "",
    place: "",
    date: "",
  });

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!photos) return;
    const photosDisplayed = photos.filter(
      (photo: ExtendedPhoto) => photo.group === photoGroup
    );
    // go back to the top of the page
    setPhotosDisplayed(photosDisplayed);
    scroll?.scrollTo(0, 0, 0);
  }, [photoGroup]);

  useEffect(() => {
    // Update the title when the scroll changes
    scroll?.on("scroll", (e: any) => {
      const idx = Math.round(
        (e.scroll.y / e.limit.y) * (photosDisplayed.length - 1)
      );

      setInfos?.({
        title: photosDisplayed[idx]?.capitalizedTitle,
        place: photosDisplayed[idx]?.place,
        date: photosDisplayed[idx]?.date,
      });
    });

    // Update the title when the scroll changes
  }, [scroll, photos]);
  console.log(infos);
  return infos;
};

export default useUpdateTitle;

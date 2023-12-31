import { ExtendedPhoto, Photo } from "@/types";

export const capitalizeWord = (string: string) => {
  const uppercasedString = [string].map(
    (element: string) =>
      element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
  );
  return uppercasedString.join();
};

export const createPhoto = (src: string) => {
  const fileName = src?.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return {
    src,
    alt,
  };
};

export function lerp(x: number, y: number, t: number) {
  return (1 - t) * x + t * y;
}

export const createPhotoTitle = (src: string) => {
  const fileName = src?.split("/").pop()?.slice(1);
  const alt = fileName ? fileName.split(".")[0] : "";
  const altArray = alt.split("_");
  altArray.shift();
  const title = altArray.join(" ");

  const capitalizedTitle = capitalizeWord(title);
  return { src, alt, capitalizedTitle, dominantColor: "" };
};

export const createAlt = (src: string) => {
  const fileName = src?.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return alt;
};

export const loadImage = (src: string) => {
  const img = new Image();
  img.src = src;
  return img;
};

export function getAspectRatio(image: HTMLImageElement) {
  const w = image.naturalWidth;
  const h = image.naturalHeight;

  let aspectRatio;

  if (w > h) {
    aspectRatio = w / h;
  } else {
    aspectRatio = h / w;
  }

  return aspectRatio;
}

export const updateAspectRatio = async (photos: ExtendedPhoto[] | Photo[]) => {
  await Promise.all(
    photos.map(async (photo) => {
      const img = new Image();
      img.src = photo.src;

      await new Promise((resolve) => {
        img.onload = (e: any) => {
          const width = e.target.width;
          const height = e.target.height;
          const aspectRatio = width / height;

          // Update the photo object with the aspectRatio
          photo.aspectRatio = aspectRatio;
        };
      });
    })
  );
};

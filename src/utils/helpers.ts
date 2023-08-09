import ColorThief from "colorthief";

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

export const rgbToHex = ([r, g, b]: [number, number, number]) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export async function getDominantColor(imageSrc: string): Promise<string> {
  const colorThief = new ColorThief();
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const dominantColor = colorThief.getColor(image);
      const colorHex = `#${(
        (1 << 24) +
        (dominantColor[0] << 16) +
        (dominantColor[1] << 8) +
        dominantColor[2]
      )
        .toString(16)
        .slice(1)}`;
      resolve(colorHex);
    };
  });
}

export const updateDominantColors = async (photos: any) => {
  for (let idx = 0; idx < photos.length; idx++) {
    const photo = photos[idx];
    const color = await getDominantColor(photo.src);
    photos[idx].dominantColor = color;
  }
  console.log(JSON.stringify(photos));
};

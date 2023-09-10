import ColorThief from "colorthief";

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export const rgbToHex = ([r, g, b]: [number, number, number]) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

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

export const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: number, g: number, b: number) => {
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};

export const updateDominantColors = async (photos: any) => {
  console.log("Updating dominant colors");
  for (let idx = 0; idx < photos.length; idx++) {
    const photo = photos[idx];
    const color = await getDominantColor(photo.src);
    photos[idx].dominantColor = color;
  }
  // console.log(JSON.stringify(photos));
};

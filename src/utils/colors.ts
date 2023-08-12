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
  // Remove the # character if present
  hex = hex.replace("#", "");

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  // Verify if the input is a valid hexadecimal color code
  const validHexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (!validHexRegex.test(hex)) {
    throw new Error("Invalid Hexadecimal Color Code.");
  }

  // Convert the hex value to decimal
  const [r, g, b] = (hex.match(/[A-Fa-f0-9]{2}/g) || []) // Match the values in pairs (e.g. 03, FF)
    .map((value) => parseInt(value, 16));

  // Return the RGB values as an object
  return {
    r,
    g,
    b,
  };
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

export const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const updateDominantColors = async (photos: any) => {
  for (let idx = 0; idx < photos.length; idx++) {
    const photo = photos[idx];
    const color = await getDominantColor(photo.src);
    photos[idx].dominantColor = color;
  }
  console.log(JSON.stringify(photos));
};

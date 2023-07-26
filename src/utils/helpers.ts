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

export const createPhotoTitle = (src: string) => {
  const fileName = src?.split("/").pop()?.slice(1);
  const alt = fileName ? fileName.split(".")[0] : "";
  const altArray = alt.split("_");
  altArray.shift();
  const title = altArray.join(" ");

  const capitalizedTitle = capitalizeWord(title);
  return { src, alt, capitalizedTitle };
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

export const capitalizeWord = (string: string) => {
  const uppercasedString = [string].map(
    (element: string) =>
      element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
  );
  return uppercasedString.join();
};

export const createPhoto = (src: string) => {
  const fileName = src.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return {
    src,
    alt,
  };
};

export const createPhotoTitle = (src: string) => {
  const fileName = src.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  const title = alt.replaceAll("_", " ");
  const capitalizedTitle = capitalizeWord(title);
  return { src, alt, capitalizedTitle };
};

export const createAlt = (src: string) => {
  const fileName = src.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return alt;
};

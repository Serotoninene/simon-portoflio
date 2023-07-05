export const createPhoto = (src: string) => {
  const fileName = src.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return {
    src,
    alt,
  };
};

export const createAlt = (src: string) => {
  const fileName = src.split("/").pop();
  const alt = fileName ? fileName.split(".")[0] : "";
  return alt;
};

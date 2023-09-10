const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const color = require("dominant-color");

import { capitalizeWord } from "../src/utils/helpers";
import { photos } from "../src/data/photos";
import { ExtendedPhoto } from "@/types";

// loop through evey photos in the summer, winter, fall, spring folder
// get the name of every files
// if the name of the file is not in the photos array, add it to the array

const directoryPath = path.join(__dirname, "../public/assets/photos"); // Adjust the path as needed

const fetchFoldersNames = () => {
  try {
    // Get the names of all the folders in the directory
    const folderNames = fs.readdirSync(directoryPath);
    // remove the not folders elements
    const filteredFolderNames = folderNames.filter((folderName: string) => {
      if (folderName !== "home") {
        return !folderName.includes(".");
      }
    });
    return filteredFolderNames;
  } catch (error) {
    console.error("Error fetching photo file names:", error);
  }
};

const folders = fetchFoldersNames();
// all the photos with group === "winter"
const winterPhotos = photos.filter((photo: ExtendedPhoto) => {
  return photo.group === "winter";
});

// LOOP THROUGH EVERY PHOTOS IN THE SUMMER, WINTER, FALL, SPRING FOLDER
folders.forEach((folder: string) => {
  const folderPhotos = photos.filter((photo: ExtendedPhoto) => {
    return photo.group === folder;
  });
  // get the name of every files
  const files = fs.readdirSync(`${directoryPath}/${folder}`);
  // if the name of the file is not in the photos array, add it to the array
  files.forEach((file: string) => {
    const p = `/assets/photos/${folder}/${file}`;

    if (
      !folderPhotos.some(
        (photo: ExtendedPhoto) => photo.src === p || file.includes(".DS_Store")
      )
    ) {
      sharp(`./public/${p}`)
        .metadata()
        .then((metadata: any) => {
          const src = p;
          // i need the alt
          const alt = file.split(".")[0];
          // i need the capitalizedTitle
          const capitalizedTitle = capitalizeWord(alt);
          // i need the group
          const group = folder;
          // aspect ratio
          const aspectRatio = metadata.width / metadata.height;
        })
        .catch((err: any) => {
          console.error("Error:", err);
        });
    }
  });
});

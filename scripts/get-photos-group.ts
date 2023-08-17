const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../public/assets/photos"); // Adjust the path as needed

// inside directyPath there is 4 folders with photos, each folder is a group, i want to create an array with the name of each group and each photo per object
const fetchPhotoFileNames = () => {
  try {
    const fileNames = fs.readdirSync(directoryPath);
    const groups = fileNames.map((group) => {
      const groupPath = path.join(directoryPath, group);
      const photos = fs.readdirSync(groupPath);
      return { group, photos };
    });
    console.log(groups);
  } catch (error) {
    console.error("Error fetching photo file names:", error);
  }
};

fetchPhotoFileNames();

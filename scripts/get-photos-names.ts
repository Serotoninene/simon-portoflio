const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../public/assets/photos"); // Adjust the path as needed

const fetchPhotoFileNames = () => {
  try {
    // Get the names of all the files in the directory
    const fileNames = fs.readdirSync(directoryPath);
    console.log(fileNames);
  } catch (error) {
    console.error("Error fetching photo file names:", error);
  }
};

fetchPhotoFileNames();

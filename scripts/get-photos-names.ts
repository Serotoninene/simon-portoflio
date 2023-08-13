const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../public/assets/photos"); // Adjust the path as needed

const fetchPhotoFileNames = () => {
  try {
    const fileNames = fs.readdirSync(directoryPath);
  } catch (error) {
    console.error("Error fetching photo file names:", error);
  }
};

fetchPhotoFileNames();

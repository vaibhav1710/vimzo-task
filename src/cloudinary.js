const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log(process.env.API_KEY);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vizmo",
    allowedFormats: ["jpeg", "jpg", "png"],
  },
});

module.exports = {
  cloudinary,
  storage,
};

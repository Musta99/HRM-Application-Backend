import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    // upload the file to cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "hrm_application_profileImages",
    });
    console.log("Printing the response: ", response);
    // file has been successfully uploaded,
    console.log("File uploaded to Cloudinary successfully");
    return response;
  } catch (err) {
    fs.unlinkSync(filePath);
    console.error("Error uploading file to Cloudinary:", err);
    return null;
  }
};

export { uploadToCloudinary };

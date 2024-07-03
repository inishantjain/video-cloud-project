import { v2 as cloudinary } from "cloudinary";

export const uploadFileToCloudinary = async (file: any) => {
  //FIXME: fix its type
  let resource_type: "auto" | "image" | "video" = "auto";
  if (file.mimetype.startsWith("image/")) {
    resource_type = "image";
  } else if (file.mimetype.startsWith("video/")) {
    resource_type = "video";
  }

  return await cloudinary.uploader.upload(file.tempFilePath, {
    folder: process.env.CLOUDINARY_FOLDER_NAME || "nodejs-cloud-project-app",
    resource_type,
  });
};

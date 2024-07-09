import { Request, Response } from "express";
import asyncWrapper from "../middlewares/async";
import { BadRequestError, CustomError, NotFoundError } from "../errors/custom-error";
import { uploadFileToCloudinary } from "../utils/fileUpload";
import Video from "../model/Video";
import User from "../model/User";

////////////////////////////////////////////////////////////////////////////////
/////////////////////////A D D////V I D E O///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const addVideo = asyncWrapper(async (req: Request, res: Response) => {
  const { id: userId } = req.body.user;
  const videoFile = req.files?.video;
  if (!videoFile) throw new BadRequestError("Video file not found");

  const { title, description } = req.body;
  if (!title || !description) throw new BadRequestError("title and description are required");

  let uploadedVideo;
  try {
    uploadedVideo = await uploadFileToCloudinary(videoFile);
  } catch (error) {
    throw new CustomError("Some error occurred while uploading video");
  }
  // console.log(uploadedVideo?.secure_url);
  const video = await Video.create({ description, title, url: uploadedVideo?.secure_url });
  await User.findByIdAndUpdate(userId, { $push: { videos: video._id } });
  res.status(200).json({ videoData: video });
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////V I D E O////F E E D////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export const getVideoFeed = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find({ videos: { $gt: [] } }).populate({
    path: "videos",
    options: { limit: 5 },
  });
  res.status(200).json({ users });
});

////////////////////////////////////////////////////////////////////////////////
//////////////////G E T////V I D E O////B Y////U S E R//////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const getVideosByUserId = asyncWrapper(async (req: Request, res: Response) => {
  const id = req.query.userId;
  const fname = req.query.username;
  let user;
  if (id) user = await User.findById(id).populate("videos");
  else if (fname) user = await User.findOne({ fname }).populate("videos");
  else throw new BadRequestError("please provide either userid or usernane");

  if (!user) throw new NotFoundError("No user found");

  res.status(200).json({ videosData: user.videos });
});

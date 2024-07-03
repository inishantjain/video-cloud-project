import { Schema, Types, model } from "mongoose";

interface IVideo {
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  //TODO: do i need to add size of the video here?
}

const videoSchema = new Schema<IVideo>({
  title: { type: "string", required: true, maxlength: 150 },
  description: { type: "string", required: true, maxlength: 600 },
  url: { type: "string", required: true },
  thumbnail: "string",
});

const Video = model<IVideo>("Video", videoSchema);
export default Video;

import VideoCard from "../../components/VideoCard";
import { VideoProps } from "../../types/types";

export default function MyVideos({ videos }: { videos: VideoProps[] }) {
  if (videos?.length === 0)
    return (
      <div className="max-w-screen-xl mx-10">
        <h2>You don't have any videos yet.</h2>
      </div>
    );

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="font-semibold text-xl py-5">My Videos</h2>
      <div className="grid grid-cols-3 gap-2 w-full">
        {videos.map((vid) => (
          <VideoCard key={vid._id} {...vid} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getVideoByUserApi } from "../../services/api";
import Spinner from "../../components/Spinner";
import VideoCard from "../../components/VideoCard";
import { VideoProps } from "../../types/types";

interface indexProps {}

function UserVideos({}: indexProps) {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const navigate = useNavigate();
  if (!username) navigate("/not-found");

  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    (async () => {
      if (!username) return;
      setLoading(true);
      try {
        const videos = await getVideoByUserApi({ username });
        console.log(videos);
        if (videos) setVideos(videos);
      } catch (error) {
        //FIXME: handle error properly
        navigate("/not-found");
      }
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Spinner />
      </div>
    );
  else if (videos.length === 0 || !videos[0].url)
    return (
      <div>
        <h1>User hasn't posted any videos yet.</h1>
      </div>
    );

  return (
    <div className="w-11/12 mx-auto">
      <div className="p-4">
        <h3 className="text-3xl mb-4">
          All Videos Posted By <span className="font-semibold capitalize">{username}</span>
        </h3>
        <div className="flex flex-wrap gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserVideos;

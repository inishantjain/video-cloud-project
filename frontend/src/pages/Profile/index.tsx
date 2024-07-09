import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import BioChangeModal from "./BioChangeModal";
import VideoUploadModal from "./VideoUploadModal";
import MyVideos from "./MyVideos";
import { VideoProps } from "../../types/types";
import { getVideoByUserApi } from "../../services/api";

/**Component */
function Profile() {
  const { user } = useAuth();

  const [bioChangeModalOpen, setBioChangeModalOpen] = useState(false);
  const [videoUploadModalOpen, setVideoUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState<VideoProps[]>([]);

  if (!user) return <Navigate to={"/login"} />;

  useEffect(() => {
    (async () => {
      const fetchedVideos = await getVideoByUserApi({ userId: user!._id });
      if (videos) setVideos(fetchedVideos);
    })();
  }, []);

  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto p-20">
      <div className="py-8 px-8 mr-auto bg-white rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src={user?.imgUrl || "https://placehold.co/500"}
          alt="placeholder"
        />
        <div className="flex-1 flex justify-between items-start text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <div className="flex gap-4 items-center">
              <p className="text-lg text-black font-semibold capitalize">{user.fname + " " + user.lname}</p>
              <p className="text-slate-500 font-medium">{user.number}</p>
            </div>
            <p className="text-slate-500 font-medium text-sm">{user.email}</p>
            <p>{user?.bio}</p>
          </div>
          <button
            onClick={() => setBioChangeModalOpen(true)}
            className="px-4 py-1 text-sm text-blue-600 font-semibold focus:ring-offset-2"
          >
            {user.bio ? "Change Bio" : "Add Bio"}
          </button>
        </div>
      </div>

      <div className="p-4 float-right">
        <button
          onClick={() => setVideoUploadModalOpen(true)}
          className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Add Video
        </button>
      </div>
      <MyVideos videos={videos} />
      {videoUploadModalOpen && <VideoUploadModal setModal={setVideoUploadModalOpen} setVideosState={setVideos} />}
      {bioChangeModalOpen && <BioChangeModal setModal={setBioChangeModalOpen} />}
    </div>
  );
}

export default Profile;

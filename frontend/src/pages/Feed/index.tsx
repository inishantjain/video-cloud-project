import { useEffect, useState } from "react";
import { getVideoFeedApi } from "../../services/api";
import { User } from "../../types/types";
import { Link } from "react-router-dom";
import VideoCard from "../../components/VideoCard";

function Feed() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const user = await getVideoFeedApi();
      if (user) setUser(user);
    })();
  }, []);
  return (
    <div className="w-11/12 mx-auto">
      {user.map((user) => (
        <div key={user._id}>
          <div className="flex justify-between py-5">
            <h3>
              Videos By <span className="capitalize font-semibold text-xl">{user.fname + " " + user.lname}</span>
            </h3>
            <Link
              className="px-4 py-1 text-lg text-blue-600 font-semibold focus:ring-offset-2"
              to={"/video/" + user.fname}
            >
              See All &#8680;
            </Link>
          </div>
          <div className="flex overflow-x-scroll gap-3 z-10 items-center">
            {user.videos.map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;

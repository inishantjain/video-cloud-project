import { useEffect, useState } from "react";
import { getVideoFeedApi } from "../../services/api";
import { User } from "../../types/types";
import { Link } from "react-router-dom";
import VideoCard from "../../components/VideoCard";
import Spinner from "../../components/Spinner";

function Feed() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getVideoFeedApi();
        if (res.ok) {
          const jsonRes = await res.json();
          // console.log(jsonRes);
          if (users) setUsers(jsonRes.users);
          setError(null);
        } else {
          setError(`Error: ${(await res.json()).message}`);
        }
      } catch (err: any) {
        setError(`Error: ${err?.message}`);
      }

      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="min-h-[80vh] grid place-content-center">
        <Spinner />
      </div>
    );

  return (
    <div className="w-11/12 mx-auto">
      {error && <p className="text-xl text-center mt-5 font-semibold">{error}</p>}
      {users.map((user) => (
        <div key={user._id} className="z-0">
          <div className="flex justify-between py-5 -z-10">
            <h3>
              Videos By <span className="capitalize font-semibold text-xl">{user.fname + " " + user.lname}</span>
            </h3>
            <Link
              className="px-4 py-1 text-lg text-blue-700 underline focus:ring-offset-2"
              to={"/videos?user=" + user.fname}
            >
              see all
            </Link>
          </div>
          <div className="flex gap-3 items-center justify-start">
            {user.videos.map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </div>
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
}

export default Feed;

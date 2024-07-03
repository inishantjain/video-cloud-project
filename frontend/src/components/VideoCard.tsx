import { VideoProps } from "../types/types";

function VideoCard({ title, description, thumbnail, url }: VideoProps) {
  return (
    <>
      <div>
        <div className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200">
          <div className="flex h-40 flex-col justify-between overflow-hidden">
            <img
              src={thumbnail || url.replace(/\.[^/.]+$/, ".jpg")}
              alt={title}
              className="group-hover:scale-110 h-full w-full object-cover duration-200"
            />
          </div>
          <div className="flex-1 overflow-hidden bg-white px-6 py-3">
            <h5 className="group-hover:text-indigo-600 mb-2 text-xl font-bold text-ellipsis">{title}</h5>
            <p className="mb-3 text-gray-600 text-sm">{description}</p>
            <div className="flex justify-between">
              <button className="group font-bold text-sm focus:text-indigo-600 hover:text-indigo-600">
                <span>▷</span>&nbsp;
                <span className="underline">Watch Now</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mx-2 rounded-xl bg-gray-100"></div>
      </div>
    </>
  );
}

export default VideoCard;

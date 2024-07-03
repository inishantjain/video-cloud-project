import { VideoProps } from "../types/types";

function VideoCard({ title, description, thumbnail, url }: VideoProps) {
  console.log(url?.replace(/\.[^/.]+$/, ".jpg"));
  return (
    <div className="w-full max-w-xs overflow-hidden h-72 bg-white rounded-lg shadow-xl">
      <img className="object-cover w-full min-h-40" src={thumbnail || url.replace(/\.[^/.]+$/, ".jpg")} alt={title} />

      <div className="py-5 text-center">
        <a href="#" className="block text-xl font-bold text-gray-800 " tab-index="0" role="link">
          {title}
        </a>
        <span className="text-sm text-gray-700 line-clamp-2">{description}</span>
      </div>
    </div>
  );
}

export default VideoCard;

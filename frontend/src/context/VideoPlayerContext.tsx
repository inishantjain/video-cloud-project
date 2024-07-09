import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";

interface VideoPlayerContextProps {
  playVideo: (src: string) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextProps | undefined>(undefined);

export const useVideoPlayer = (): VideoPlayerContextProps => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
};

interface VideoPlayerProviderProps {
  children: ReactNode;
}

export const VideoPlayerProvider: React.FC<VideoPlayerProviderProps> = ({ children }) => {
  const [src, setSrc] = useState<string | null>(null);

  const playVideo = (videoSrc: string) => {
    setSrc(videoSrc);
  };

  const closeVideo = () => {
    setSrc(null);
  };

  return (
    <VideoPlayerContext.Provider value={{ playVideo }}>
      {children}
      {src && ReactDOM.createPortal(<VideoPlayer src={src} onClose={closeVideo} />, document.body)}
    </VideoPlayerContext.Provider>
  );
};

interface VideoPlayerProps {
  src: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.play();
    }
  }, [src]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-full max-w-3xl">
        <video ref={videoRef} className="w-full rounded" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

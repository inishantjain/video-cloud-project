import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "../../components/Spinner";
import { uploadVideoApi } from "../../services/api";
import { VideoProps } from "../../types/types";
type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  setVideosState: Dispatch<SetStateAction<VideoProps[]>>;
};

/**Component */
const VideoUploadModal = ({ setModal, setVideosState }: Props) => {
  const maxSize = 6 * 1024 * 1024; // 6MB in bytes
  const [previewSource, setPreviewSource] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    if (evt.target.name === "title" && form.title.length === 150 && value.length > 150) return;
    else if (evt.target.name === "description" && form.title.length === 500 && value.length > 500) return;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  async function handleSave() {
    if (!videoFile || !previewSource) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.title);
      formData.append("video", videoFile);

      const videoData = await uploadVideoApi(formData);
      if (videoData) setVideosState((prev) => [...prev, videoData]);
      setModal(false);
    } catch (error: any) {
      setError("Some error occurred while uploading the video" + error?.message);
    }
    setLoading(false);
  }

  function handleVideoInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      // at least one file has been dropped so do something
      const file = e.target.files[0];
      if (file.size > maxSize) return alert("Video can't be larger than 6mb");
      setVideoFile(file);
      setPreviewSource(URL.createObjectURL(file));
    }
  }

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 max-w-screen-md mx-auto">
        <div className="p-5 min-h-80 bg-white mt-20 rounded relative">
          <div className="flex gap-5 justify-between">
            <div className="aspect-video w-72">
              {previewSource && videoFile ? (
                <video width="600" controls>
                  <source src={previewSource} type="video/mp4"></source>
                </video>
              ) : (
                <div className="w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                  <img src="https://placehold.co/600x400" alt="" />
                </div>
              )}
            </div>
            <form className="flex-1">
              <label className="text-gray-700" htmlFor="title">
                Title
                <span className="float-right">{`${form.title.length}/150`}</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                onChange={handleChange}
                value={form.title}
                className="mb-4 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <label className="text-gray-700" htmlFor="description">
                Description
                <span className="float-right">{`${form.description.length}/600`}</span>
              </label>
              <textarea
                id="description"
                value={form.description}
                name="description"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </form>
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="px-4 py-1 text-sm text-blue-600 font-semibold focus:ring-offset-2">
              {loading ? (
                <p className="font-normal">Please wait while we upload your file...</p>
              ) : (
                <label htmlFor="video">
                  {videoFile ? "select another video" : "select a video file"}(max {maxSize / (1024 * 1024)}mb)
                  <input
                    onChange={handleVideoInputChange}
                    id="video"
                    type="file"
                    accept="video/mp4"
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={loading || !videoFile || !previewSource || !form.title || !form.description}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform disabled:bg-blue-900 bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              {loading ? <Spinner /> : "Upload"}
            </button>
          </div>

          {error && <div className="text-red-600">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default VideoUploadModal;

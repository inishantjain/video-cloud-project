import { SetStateAction, Dispatch, useState } from "react";
import { editUserApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};
//Modal to change th bio
const BioChangeModal = ({ setModal }: Props) => {
  const [bio, setBio] = useState<string>("");
  const { setUser, user } = useAuth();

  async function saveHandler() {
    try {
      if (await editUserApi({ bio })) {
        setModal(false);
        setUser({ ...user!, bio });
      }
    } catch (error) {
      alert("An error occurred while updating the bio");
      console.error("An error occurred while updating the bio ", error);
    }
  }

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      {/* fix css to close modal when clicked outside vertically */}
      <div className="fixed inset-0 w-fit mx-auto">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <h2 className="text-gray-200">📍 Change/Add Bio</h2>

            <div className="mt-6">
              <label htmlFor="bio" className="text-sm text-gray-600 dark:text-gray-200">
                Bio
              </label>

              <textarea
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="mt-5 sm:flex sm:items-center sm:justify-between">
            <button
              onClick={() => setModal(false)}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Cancel
            </button>

            <button
              onClick={saveHandler}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioChangeModal;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGizmoRequest,
  getCurrentUserFromLocal,
  getSingleGizmo,
  getSingleGizmoRequest,
  getSingleUserInfo,
  updateGizmoRequest,
} from "../api/dataAccess";

export const RequestForm = ({
  requestId,
  requestGizmoId,
  setModalIsActive,
}) => {
  const [requestForm, updateForm] = useState({
    startDate: "",
    endDate: "",
    userId: 0,
    requestMsg: "",
    requestStatus: "",
  });

  const [gizmo, setGizmo] = useState([]);

  const navigate = useNavigate();

  const localUser = getCurrentUserFromLocal();

  const { gizmoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let currentGizmo;
      if (requestGizmoId) {
        currentGizmo = await getSingleGizmo(requestGizmoId);
      } else {
        currentGizmo = await getSingleGizmo(gizmoId);
      }
      const currentUser = getCurrentUserFromLocal();
      const currentUserDb = await getSingleUserInfo(currentUser.uid);

      if (currentUserDb.id === currentGizmo.userId) {
        navigate("/garage");
      }

      if (requestId) {
        const currentUserRequest = await getSingleGizmoRequest(requestId);
        updateForm(currentUserRequest);
      }

      // if (
      //   currentGizmo.id === undefined ||
      //   currentGizmo.uid != localUser.uid
      // ) {
      //   navigate("/garage");
      // }
      setGizmo(currentGizmo);
    };
    fetchData();
  }, []);

  // Handles calling the upload image function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formCopy = { ...requestForm };
    const userInfo = await getSingleUserInfo(localUser.uid);
    formCopy.userId = userInfo.id;
    formCopy.gizmoId = gizmoId;
    formCopy.requestStatus = "pending";

    const respone = await createGizmoRequest(formCopy);
    navigate("/garage");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formCopy = { ...requestForm };
    formCopy.requestStatus = "pending";
    const updateResponse = await updateGizmoRequest(requestId, formCopy);
    setModalIsActive(false);
  };

  return (
    <>
      <h1 className="dark:text-white text-center md:text-left text-4xl mb-11 mt-5 md:ml-20 md:max-w-3xl mx-auto">
        Request Jeremy's {gizmo.nickName}
      </h1>
      <img
        className="w-28 h-28 object-cover mx-auto mb-10 rounded-full"
        src={gizmo.img}
      />

      <form className=" max-w-md px-5 md:max-w-3xl pt-54 mx-auto">
        <fieldset className="mb-6">
          <label
            htmlFor="requestStartDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Request Start Date
          </label>
          <input
            type="date"
            id="requestStartDate"
            maxLength="15"
            value={requestForm.startDate}
            onChange={(e) => {
              const formCopy = { ...requestForm };
              formCopy.startDate = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. 37210"
          />
        </fieldset>
        <fieldset className="mb-6">
          <label
            htmlFor="requestEndDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Request End Date
          </label>
          <input
            type="date"
            id="requestEndDate"
            maxLength="15"
            value={requestForm.endDate}
            onChange={(e) => {
              const formCopy = { ...requestForm };
              formCopy.endDate = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. 37210"
          />
        </fieldset>
        <fieldset className="mb-6">
          <label
            htmlFor="requestMsg"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Request Message
          </label>
          <textarea
            rows={3}
            id="requestMst"
            maxLength="300"
            value={requestForm.requestMsg}
            onChange={(e) => {
              const formCopy = { ...requestForm };
              formCopy.requestMsg = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Why do you want to borrow this Gizmo?"
          />
        </fieldset>
        <div className="md:space-x-8 space-y-8">
          {requestId ? (
            <>
              <button
                type="submit"
                onClick={(click) => {
                  handleUpdate(click);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Request
              </button>

              <button
                onClick={(click) => {
                  click.preventDefault();
                  setModalIsActive(false);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                onClick={(click) => {
                  handleSubmit(click);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit Request
              </button>

              <button
                onClick={(click) => {
                  click.preventDefault();
                  navigate(`/gizmo-details/${gizmoId}`);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go Back
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

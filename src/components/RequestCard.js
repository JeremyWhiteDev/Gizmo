import { useState } from "react";
import {
  createGizmoRental,
  deleteGizmoRequest,
  updateGizmoRequest,
} from "../api/dataAccess";
import { EditRequestModal } from "./modals/EditRequestModal";

export const RequestCard = ({
  requestId,
  startDate,
  endDate,
  requestMsg,
  gizmo,
  user,
  img,
  variant,
  requestGizmoId,
  requestObj,
}) => {
  const [modalIsActive, setModalIsActive] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setModalIsActive(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteResponse = await deleteGizmoRequest(requestId);
  };
  const handleApprove = async (e) => {
    e.preventDefault();
    const copyRequest = { ...requestObj };
    copyRequest.requestStatus = "approved";
    delete copyRequest.user;
    delete copyRequest.gizmo;

    const updateResponse = updateGizmoRequest(requestId, copyRequest);

    const rentalObj = { ...requestObj };
    delete rentalObj.user;
    delete rentalObj.gizmo;
    delete rentalObj.requestStatus;
    delete rentalObj.requestMsg;
    delete rentalObj.id;
    rentalObj.isComplete = false;

    const rentalResponse = createGizmoRental(rentalObj);
  };
  const handleDecline = async () => {
    const copyRequest = { ...requestObj };
    copyRequest.requestStatus = "declined";
    const updateResponse = updateGizmoRequest(requestId, copyRequest);
  };

  return (
    <>
      <div className="flex flex-col  border border-gray-200 rounded-lg shadow-md md:flex-row md:w-full dark:border-gray-700 dark:bg-gray-800">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={img}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex flex-col md:flex-row items-baseline gap-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user}'s {gizmo}
            </h5>
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
              Rental Period: {startDate} Thru {endDate}
            </p>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {requestMsg}
          </p>
          <div className="flex gap-6 md:flex-row ">
            {variant === "outgoingRequest" ? (
              <>
                <button
                  type="submit"
                  onClick={(click) => {
                    handleEdit(click);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  type="submit"
                  onClick={(click) => {
                    handleDelete(click);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  onClick={(click) => {
                    handleApprove(click);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Approve
                </button>
                <button
                  type="submit"
                  onClick={(click) => {
                    handleDecline(click);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Decline
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <EditRequestModal
        isActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        requestId={requestId}
        requestGizmoId={requestGizmoId}
      />
    </>
  );
};

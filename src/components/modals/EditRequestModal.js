import { RequestForm } from "../forms/RequestForm";
import "./Modal.css";

export const EditRequestModal = ({
  isActive,
  setModalIsActive,
  requestId,
  requestGizmoId,
}) => {
  if (isActive) {
    return (
      <>
        <div
          className="overlay--user "
          onClick={(click) => setModalIsActive(false)}
        ></div>
        <div className="modal--user bg-gray-50 shadow-md dark:shadow-none dark:bg-gray-800">
          <button
            className="close-modal-btn"
            onClick={() => {
              setModalIsActive(false);
            }}
          >
            X
          </button>
          {
            <RequestForm
              requestGizmoId={requestGizmoId}
              requestId={requestId}
              setModalIsActive={setModalIsActive}
            />
          }
        </div>
      </>
    );
  } else {
    return "";
  }
};

import { useEffect, useState } from "react";
import { getPendingUserGizmoRequests } from "../api/dataAccess";
import { RequestCard } from "./RequestCard";

export const RequestList = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPendingUserGizmoRequests();
      setUserRequests(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="md:max-w-5xl mx-auto">
        <h1 className="dark:text-white text-center md:text-left text-4xl mt-5 md:max-w-5xl mx-auto mb-20">
          Gizmo Requests
        </h1>
        <section className="border-2 border-gray-700 rounded-lg px-4 p-4 mt-5">
          <h2 className="dark:text-white text-center md:text-left text-3xl mb-11 md:max-w-5xl mx-auto border-b-2 border-gray-500">
            My Pending Requests
          </h2>
          <div className="flex flex-col items-center justify-evenly gap-7">
            {userRequests.map((request) => (
              <RequestCard
                key={`outgoingRequest--${request.id}`}
                requestObj={request}
                variant="outgoingRequest"
                requestId={request.id}
                img={request.gizmo?.img}
                requestGizmoId={request.gizmo?.id}
                gizmo={request.gizmo?.nickName}
                user={request.user?.firstName}
                startDate={request.startDate}
                endDate={request.endDate}
                requestMsg={request.requestMsg}
              />
            ))}
          </div>
        </section>
        <section className=" border-2 border-gray-700 rounded-lg px-4 p-4 mt-5">
          <h2 className="dark:text-white text-center md:text-left text-3xl mb-8 md:max-w-5xl mx-auto border-b-2 border-gray-500">
            Reqests for Your Gizmos
          </h2>
          <div className="flex flex-col items-center justify-evenly gap-7 ">
            {userRequests.map((request) => (
              <RequestCard
                key={`incomingRequest--${request.id}`}
                requestObj={request}
                variant="incomingRequest"
                requestId={request.id}
                img={request.gizmo?.img}
                requestGizmoId={request.gizmo?.id}
                gizmo={request.gizmo?.nickName}
                user={request.user?.firstName}
                startDate={request.startDate}
                endDate={request.endDate}
                requestMsg={request.requestMsg}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

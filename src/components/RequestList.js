import { useEffect, useState } from "react";
import { getUserGizmoRequests } from "../api/dataAccess";
import { RequestCard } from "./RequestCard";

export const RequstList = () => {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserGizmoRequests();
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
                variant="outgoingRequest"
                img={request.gizmo?.img}
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
                variant="incomingRequest"
                img={request.gizmo?.img}
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
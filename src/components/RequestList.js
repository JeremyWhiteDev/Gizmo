import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getCurrentUserFromDb,
  getOngoingRentals,
  getPendingUserGizmoRequests,
  getRequestsForSingleUsersGizmos,
  getUpcomingRentals,
} from "../api/dataAccess";
import { LoanCard } from "./cards/LoanCard";
import { RequestCard } from "./cards/RequestCard";

export const RequestList = () => {
  const queryClient = useQueryClient();

  const currentUser = useQuery("currentUser", getCurrentUserFromDb, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const pendingRequests = useQuery(
    ["pendingUserGizmoRequests"],
    async () => await getPendingUserGizmoRequests(currentUser.data.id)
  );
  const requestedGizmos = useQuery(
    ["pendingGizmoUserRequests"],
    async () => await getRequestsForSingleUsersGizmos(currentUser.data.id)
  );
  const upcomingLoans = useQuery(
    ["approvedUpcomingUserLoans"],
    async () => await getUpcomingRentals(currentUser.data.id)
  );
  const ongoingLoans = useQuery(
    ["approvedOngoingUserLoans"],
    async () => await getOngoingRentals(currentUser.data.id)
  );

  return (
    <>
      <div className="md:max-w-5xl mx-auto">
        <h1 className="dark:text-white text-center md:text-left text-4xl mt-5 md:max-w-5xl mx-auto mb-20">
          Gizmo Requests & Loans
        </h1>
        <section className="border-2 border-gray-700 rounded-lg px-4 p-4 mt-5">
          <h2 className="dark:text-white text-center md:text-left text-3xl mb-11 md:max-w-5xl mx-auto border-b-2 border-gray-500">
            My Pending Requests
          </h2>
          <div className="flex flex-col items-center justify-evenly gap-7">
            {!pendingRequests.isLoading &&
              pendingRequests.data?.map((request) => (
                <RequestCard
                  key={`outgoingRequest--${request.id}`}
                  requestObj={request}
                  variant="outgoingRequest"
                  requestId={request.id}
                  img={request.gizmo?.img}
                  requestGizmoId={request.gizmo?.id}
                  gizmo={request.gizmo?.nickName}
                  user={`${request.ownerUser?.firstName}'s`}
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
            {!pendingRequests.isLoading &&
              requestedGizmos.data?.map((request) => (
                <RequestCard
                  key={`incomingRequest--${request.id}`}
                  requestObj={request}
                  variant="incomingRequest"
                  requestId={request.id}
                  img={request.gizmo?.img}
                  requestGizmoId={request.gizmo?.id}
                  gizmo={request.gizmo?.nickName}
                  user={`Your`}
                  startDate={request.startDate}
                  endDate={request.endDate}
                  requestMsg={request.requestMsg}
                />
              ))}
          </div>
        </section>
        <section className=" border-2 border-gray-700 rounded-lg px-4 p-4 mt-5">
          <h2 className="dark:text-white text-center md:text-left text-3xl mb-8 md:max-w-5xl mx-auto border-b-2 border-gray-500">
            Upcoming Gizmo Loans
          </h2>
          <div className="flex flex-col items-center justify-evenly gap-7 ">
            {!upcomingLoans.isLoading &&
              upcomingLoans.data?.map((rental) => (
                <LoanCard
                  key={`incomingrental--${rental.id}`}
                  rentalObj={rental}
                  variant="upcomingLoan"
                  rentalId={rental.id}
                  img={rental.gizmo?.img}
                  rentalGizmoId={rental.gizmo?.id}
                  gizmo={rental.gizmo?.nickName}
                  user={`${
                    rental.userId !== currentUser.data?.id
                      ? "Your"
                      : `${rental.ownerUser?.firstName}'s`
                  }`}
                  startDate={rental.startDate}
                  endDate={rental.endDate}
                  renter={`${
                    rental.userId === currentUser.data?.id
                      ? `${rental.ownerUser?.firstName}`
                      : `${rental.user?.firstName}`
                  }`}
                  owner={`${
                    rental.userId !== currentUser.data?.id ? "your" : `their`
                  }`}
                />
              ))}
          </div>
        </section>
        <section className=" border-2 border-gray-700 rounded-lg px-4 p-4 mt-5">
          <h2 className="dark:text-white text-center md:text-left text-3xl mb-8 md:max-w-5xl mx-auto border-b-2 border-gray-500">
            Ongoing Gizmo Loans
          </h2>
          <div className="flex flex-col items-center justify-evenly gap-7 ">
            {!ongoingLoans.isLoading &&
              ongoingLoans.data?.map((rental) => (
                <LoanCard
                  key={`incomingrental--${rental.id}`}
                  rentalObj={rental}
                  variant={`${
                    rental.userId !== currentUser.data?.id
                      ? "ongoing-provider"
                      : ""
                  }`}
                  rentalId={rental.id}
                  img={rental.gizmo?.img}
                  rentalGizmoId={rental.gizmo?.id}
                  gizmo={rental.gizmo?.nickName}
                  user={`${
                    rental.userId !== currentUser.data?.id
                      ? "Your"
                      : `${rental.ownerUser?.firstName}'s`
                  }`}
                  startDate={rental.startDate}
                  endDate={rental.endDate}
                  renter={`${
                    rental.userId === currentUser.data?.id
                      ? `${rental.ownerUser?.firstName}`
                      : `You`
                  }`}
                  owner={`${
                    rental.userId !== currentUser.data?.id ? "your" : `their`
                  }`}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

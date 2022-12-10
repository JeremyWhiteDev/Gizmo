import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCurrentUserFromDb,
  getCurrentUserFromLocal,
  getSingleGizmo,
  getSingleUserInfo,
} from "../api/dataAccess";

export const GizmoDetails = () => {
  const [gizmo, setGizmo] = useState([]);
  const [isUsersGizmo, setUserGizmo] = useState([]);
  const { gizmoId } = useParams();
  const navigate = useNavigate();
  //img

  const queryClient = useQueryClient();

  const currentUser = useQuery("currentUser", getCurrentUserFromDb, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleGizmo(gizmoId);
      setGizmo(data);

      {
        currentUser.data?.id === data.userId
          ? setUserGizmo(true)
          : setUserGizmo(false);
      }
      document.title = data.nickName;
    };
    fetchData();
  }, []);
  //what do I want to know about each item.

  //brief description of tool
  //how old tool is, ie "jeremy bought this in 2017"
  //How often the tool gets used.
  //a record or timeline of how many people have borrowed it.
  //Tool Tags that Jeremy has created.
  //item description.
  //buttons for renting the tool
  //carousel of other tools in the same category with similar tags?
  //number of people that have saved this tool
  //for people that have borrowed this tool, they can leave a review.
  //reviews averager

  return (
    <>
      <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-6xl mx-auto  dark:border-gray-700 dark:bg-gray-800">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:max-w-xl md:rounded-none md:rounded-l-lg"
          src={gizmo.img}
          alt=""
        />

        <div className="flex flex-col justify-between p-8 leading-normal md:w-96">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {gizmo.user?.firstName}'s {gizmo.nickName}
          </h5>
          {isUsersGizmo ? (
            <>
              <ul>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Category: {gizmo.gizmoCategory?.name}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Model Number: {gizmo.model}
                </li>

                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Purchase Date: {gizmo.purchaseDate}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Amount Paid: ${gizmo.amountPaid}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Estimated Value: ${gizmo.estimatedValue}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Is this Gizmo Public: {gizmo.estimatedValue ? "Yes" : "No"}
                </li>
              </ul>

              <button
                onClick={() => {
                  navigate(`/edit-gizmo/${gizmoId}`);
                }}
                className="mt-6 bg-purple-800 py-3 rounded-lg text-white dark:text-white hover:bg-purple-900"
              >
                Edit this Tool
              </button>
            </>
          ) : !isUsersGizmo && currentUser.data?.id ? (
            <>
              <ul>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Category: {gizmo.gizmoCategory?.name}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Model Number: {gizmo.model}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Location: {gizmo.user?.zipcode}
                </li>
              </ul>
              <button
                onClick={() => {
                  navigate(`/gizmo/request/${gizmo.id}`);
                }}
                className="mt-6 bg-purple-800 py-3 rounded-lg text-white dark:text-white hover:bg-purple-900"
              >
                Request this Tool
              </button>
            </>
          ) : (
            <>
              <ul>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Category: {gizmo.gizmoCategory?.name}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Model Number: {gizmo.model}
                </li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Gizmo Location: {gizmo.user?.zipcode}
                </li>
              </ul>
              <button
                onClick={() => {
                  navigate(`/login`);
                }}
                className="mt-6 bg-purple-800 py-3 rounded-lg text-white dark:text-white hover:bg-purple-900"
              >
                Login to Request this Tool
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

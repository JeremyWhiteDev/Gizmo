import { useEffect, useState } from "react";
import { getPaginatedGizmosAndLocations } from "../api/dataAccess";
import { GizmoCard } from "./GizmoCard";

export const GizmoGarage = () => {
  const [gizmos, setGizmos] = useState([]);
  const [filteredGizmos, setFilter] = useState([]);
  const [cuurrentPage, setCurrentPage] = useState();
  const [pageData, setPageData] = useState({
    totalGizmos: 0,
    startingGizmoCount: 1,
    endingGizmoCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        1,
        "id",
        20
      );
      const totalPages = Math.ceil(totalCount / 20);
      let endingGizmoCount;
      if (totalCount < 20) {
        endingGizmoCount = totalCount;
      } else {
        endingGizmoCount = 20;
      }
      setGizmos(data);
      setPageData({
        totalGizmos: totalCount,
        startingGizmoCount: 1,
        endingGizmoCount: endingGizmoCount,
      });
    };
    fetchData();
  }, []);

  const incrementPage = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="dark:text-white">Gizmo Garage</h1>
      <div className="flex gap-y-5 flex-wrap p-2 gap-x-6 mx-auto max-w-xl md: pl-6 md:max-w-screen-xl  ">
        {gizmos.map((gizmo) => (
          <GizmoCard
            key={`gizmo--${gizmo.id}`}
            img={gizmo.img}
            name={gizmo.nickName}
            model={gizmo.model}
            location={gizmo.user?.zipcode}
            userImg={gizmo.user?.profileImg}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageData.startingGizmoCount}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageData.endingGizmoCount}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageData.totalGizmos}
          </span>{" "}
          Entries
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Prev
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

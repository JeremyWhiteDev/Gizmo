import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { getPaginatedGizmosAndLocations } from "../api/dataAccess";
import { GizmoCard } from "./GizmoCard";

export const GizmoList = () => {
  const [gizmos, setGizmos] = useState([]);
  const [filteredGizmos, setFilter] = useState([]);
  const [cuurrentPage, setCurrentPage] = useState();
  const [pageData, setPageData] = useState({
    currentPageNumber: 1,
    totalGizmos: 0,
    gizmoRangeStart: 1,
    gizmoRangeEnd: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        1,
        "id",
        20
      );
      const totalPages = Math.ceil(totalCount / 20);
      let gizmoRangeEnd;
      if (totalCount < 20) {
        gizmoRangeEnd = totalCount;
      } else {
        gizmoRangeEnd = 20;
      }
      setGizmos(data);
      setPageData({
        currentPageNumber: 1,
        totalGizmos: totalCount,
        gizmoRangeStart: 1,
        gizmoRangeEnd: gizmoRangeEnd,
      });
    };
    fetchData();
  }, []);

  const incrementPage = (e) => {
    e.preventDefault();

    //optimistically increase current page number by 1
    const pageDataCopy = { ...pageData };
    pageDataCopy.currentPageNumber += 1;

    // start/end ranges of page values
    pageDataCopy.gizmoRangeStart =
      (pageDataCopy.currentPageNumber - 1) * 20 + 1;
    if (pageDataCopy.totalGizmos < pageDataCopy.currentPageNumber * 20) {
      pageDataCopy.gizmoRangeEnd = pageDataCopy.totalGizmos;
    } else {
      pageDataCopy.gizmoRangeEnd = pageDataCopy.currentPageNumber - 1 * 20;
    }

    //fetch data based on new current page values

    const fetchData = async () => {
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        pageDataCopy.currentPageNumber,
        "id",
        20
      );
      setGizmos(data);
      setPageData(pageDataCopy);
    };
    fetchData();
  };
  const decrementPage = (e) => {
    e.preventDefault();

    //optimistically increase current page number by 1
    const pageDataCopy = { ...pageData };
    pageDataCopy.currentPageNumber -= 1;

    // start/end ranges of page values

    pageDataCopy.gizmoRangeStart =
      (pageDataCopy.currentPageNumber - 1) * 20 + 1;
    if (pageDataCopy.totalGizmos < pageDataCopy.currentPageNumber * 20) {
      pageDataCopy.gizmoRangeEnd = pageDataCopy.totalGizmos;
    } else if (pageDataCopy.currentPageNumber === 1) {
      pageDataCopy.gizmoRangeEnd = 20;
    } else {
      pageDataCopy.gizmoRangeEnd = pageDataCopy.currentPageNumber - 1 * 20;
    }
    //fetch data based on new current page values

    const fetchData = async () => {
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        pageDataCopy.currentPageNumber,
        "id",
        20
      );
      setGizmos(data);
      setPageData(pageDataCopy);
    };
    fetchData();
  };

  return (
    <>
      <h1 className="dark:text-white">Browse Gizmos</h1>
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
            {pageData.gizmoRangeStart}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageData.gizmoRangeEnd}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageData.totalGizmos}
          </span>{" "}
          Entries
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          {pageData.gizmoRangeStart === 1 ? (
            <button
              disabled
              onClick={(click) => decrementPage(click)}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 "
            >
              {" "}
              Prev
            </button>
          ) : (
            <button
              onClick={(click) => decrementPage(click)}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {" "}
              Prev
            </button>
          )}
          {pageData.gizmoRangeEnd === pageData.totalGizmos ? (
            <button
              disabled
              onClick={(click) => incrementPage(click)}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 "
            >
              Next
            </button>
          ) : (
            <button
              onClick={(click) => incrementPage(click)}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};
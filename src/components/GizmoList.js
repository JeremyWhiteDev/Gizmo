import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getCurrentUserFromDb,
  getPaginatedGizmosAndLocations,
} from "../api/dataAccess";
import { GizmoCard } from "./GizmoCard";

export const GizmoList = () => {
  const [gizmos, setGizmos] = useState([]);
  const [filteredGizmos, setFilter] = useState([]);
  const [pageData, setPageData] = useState({
    currentPageNumber: 1,
    totalGizmos: 0,
    gizmoRangeStart: 1,
    gizmoRangeEnd: 0,
  });
  const queryClient = useQueryClient();

  const currentUser = useQuery("currentUser", getCurrentUserFromDb, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

  const checkFavoriteAndGetId = (gizmoObj) => {
    const userFavorite = gizmoObj.gizmoFavorites?.filter((fav) => {
      return fav.userId === currentUser.data.id;
    });
    if (userFavorite?.length > 0) {
      return { isFavorite: true, favoriteId: userFavorite[0].id };
    } else {
      return false;
    }
  };

  return (
    <>
      <h1 className="pl-4 dark:text-white mx-auto max-w-xl md:max-w-screen-xl mb-6">
        Browse Public Gizmos
      </h1>
      <div className="flex  justify-center gap-y-5 flex-wrap p-2 gap-x-6 mx-auto max-w-xl md: md:max-w-screen-xl  ">
        {gizmos.length > 0 &&
          currentUser.data.id &&
          gizmos.map((gizmo) => {
            const { isFavorite, favoriteId } = checkFavoriteAndGetId(gizmo);
            return (
              <GizmoCard
                key={`gizmo--${gizmo.id}`}
                variant="publicCard"
                id={gizmo.id}
                img={gizmo.img}
                name={gizmo.nickName}
                model={gizmo.model}
                location={gizmo.user?.zipcode}
                userImg={gizmo.user?.profileImg}
                isFavorite={isFavorite}
                favoriteId={favoriteId}
                currentUserId={currentUser.data.id}
              />
            );
          })}
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

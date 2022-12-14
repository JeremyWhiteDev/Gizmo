import { Combobox } from "@headlessui/react";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getAllGizmoCategories,
  getCurrentUserFromDb,
  getPaginatedGizmosAndLocations,
} from "../api/dataAccess";
import { GizmoCard } from "./GizmoCard";
import { GizmoCardGuest } from "./GizmoCardGuest";

export const GizmoList = () => {
  const [gizmos, setGizmos] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredGizmos, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [query, setQuery] = useState("");
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
        20,
        ""
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

      const categoryData = await getAllGizmoCategories();
      setCategories(categoryData);
    };
    fetchData();
  }, []);

  //array of numvers, the length constitutes how many filters are applied.
  //im doing filters server side. That means for the next/previous buttons to work, they need to simply call the same use effect every time
  //that useEffect watches for page numbers to change.

  //update page number

  const getQueryString = () => {
    const filteredChecklist = checkedFilters.filter((x) => x !== false);
    const queryArr = filteredChecklist.map((x) => `&gizmoCategoryId=${x}`);
    let queryString = queryArr.join("");
    if (searchTerm) {
      queryString += `&q=${searchTerm}`;
    }
    return queryString;
  };
  useEffect(() => {
    const fetchData = async () => {
      const queryString = getQueryString();
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        1,
        "id",
        20,
        queryString
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
      const filteredCats =
        query === ""
          ? categories
          : categories.filter((category) => {
              return category.name.toLowerCase().includes(query.toLowerCase());
            });
      setFilteredCategories(filteredCats);
    };
    fetchData();
  }, [checkedFilters, searchTerm, query]);

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
      const queryString = getQueryString();
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        pageDataCopy.currentPageNumber,
        "id",
        20,
        queryString
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
      const queryString = getQueryString();
      const { data, totalCount } = await getPaginatedGizmosAndLocations(
        pageDataCopy.currentPageNumber,
        "id",
        20,
        queryString
      );
      setGizmos(data);
      setPageData(pageDataCopy);
    };
    fetchData();
  };

  useEffect(() => {
    setCheckedFilters(new Array(categories.length).fill(false));
  }, [categories]);

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
      <div className="mx-auto max-w-xl md: md:max-w-screen-xl">
        <label
          htmlFor={`searchField`}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Search
        </label>
        <input
          id={`searchField`}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Search Terms Here"
        />
        <div className="flex flex-col gap-2 my-4">
          {categories.map((category, index) => {
            return (
              <div className="">
                <input
                  id={`category--${category.id}`}
                  type="checkbox"
                  value={category.id}
                  onChange={(e) => {
                    const checkedCopy = [...checkedFilters];
                    const isChecked = e.target.checked;
                    {
                      isChecked
                        ? (checkedCopy[index] = parseInt(e.target.value))
                        : (checkedCopy[index] = false);
                    }

                    setCheckedFilters(checkedCopy);
                  }}
                  className="ml-6  w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 "
                />
                <label
                  htmlFor={`category--${category.id}`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
        {categories.length > 0 && (
          <Combobox
            value={checkedFilters}
            onChange={setCheckedFilters}
            multiple
          >
            {checkedFilters.length > 0 && (
              <ul className="">
                {checkedFilters.map((filter) => (
                  <li
                    onClick={() => {
                      const selectedFiltersCopy = [...checkedFilters];
                      const newArr = selectedFiltersCopy.filter(
                        (cat) => cat !== filter
                      );
                      setCheckedFilters(newArr);
                    }}
                    key={filter}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            )}
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              // displayValue={(category) => category.name}
            />
            <Combobox.Options>
              {categories.length > 0 && (
                <Combobox.Option value={{ id: null, name: query }}>
                  Create "{query}"
                </Combobox.Option>
              )}
              {filteredCategories.map((category) => {
                console.log(filteredCategories);
                return (
                  <Combobox.Option
                    key={category.id}
                    value={category.id}
                    className="text-white"
                  >
                    {category.name}
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          </Combobox>
        )}
      </div>
      <div className="flex  justify-center gap-y-5 flex-wrap p-2 gap-x-6 mx-auto max-w-xl md: md:max-w-screen-xl  ">
        {gizmos.length > 0 &&
          currentUser.data?.id &&
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
                currentUserId={currentUser.data?.id}
              />
            );
          })}
        {!currentUser.data?.id &&
          gizmos.map((gizmo) => {
            return (
              <GizmoCardGuest
                key={`gizmo--${gizmo.id}`}
                variant="publicCard"
                id={gizmo.id}
                img={gizmo.img}
                name={gizmo.nickName}
                model={gizmo.model}
                location={gizmo.user?.zipcode}
                userImg={gizmo.user?.profileImg}
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

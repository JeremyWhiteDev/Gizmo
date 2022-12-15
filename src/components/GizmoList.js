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
    const queryArr = checkedFilters.map((x) => {
      if (!x.isSearchTerm) {
        return `&gizmoCategoryId=${x.id}`;
      } else {
        return `&q=${x.name}`;
      }
    });
    const queryString = queryArr.join("");

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
  }, [categories, checkedFilters]);

  useEffect(() => {
    const filteredCats =
      query === ""
        ? categories
        : categories.filter((category) => {
            return category.name.toLowerCase().includes(query.toLowerCase());
          });
    setFilteredCategories(filteredCats);
  }, [query]);

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
      <div className="mx-auto max-w-xl md: md:max-w-screen-xl mb-4">
        <h3 className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Search and Filter
        </h3>
        {categories.length > 0 && (
          <div className=" z-10 w-96 bg-white rounded divide-y-reverse divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
            <Combobox
              value={checkedFilters}
              onChange={setCheckedFilters}
              multiple
            >
              <div className="flex relative">
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={(event) => {
                    if (!event.target.value) {
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
                  // displayValue={(category) => category.name}
                ></Combobox.Input>
                <Combobox.Button className="absolute  top-0 bottom-0 my-auto dark:text-gray-100 right-3">
                  v
                </Combobox.Button>
              </div>
              <Combobox.Options className="py-1 text-sm  w-96 text-gray-700 dark:text-gray-200 divide-y rounded divide-gray-100 dark:divide-gray-600 absolute dark:bg-gray-700 bg-white z-30">
                {categories.length > 0 && (
                  <div>
                    <Combobox.Option
                      value={{ id: null, name: query, isSearchTerm: true }}
                      className="block py-2 px-4  text-sm text-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Add Search Term "{query}"
                    </Combobox.Option>
                  </div>
                )}
                <div>
                  {filteredCategories.map((category) => {
                    console.log(filteredCategories);
                    return (
                      <Combobox.Option
                        key={category.id}
                        value={category}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Category: {category.name}
                      </Combobox.Option>
                    );
                  })}
                </div>
              </Combobox.Options>
            </Combobox>
          </div>
        )}
        <div>
          <ul className="py-1 flex gap-4 h-16 items-center">
            {checkedFilters.length > 0 &&
              checkedFilters.map((filter) => (
                <li
                  className="dark:text-white rounded-lg border-solid w-fit border-gray-600 px-3 border-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => {
                    const selectedFiltersCopy = [...checkedFilters];
                    const newArr = selectedFiltersCopy.filter(
                      (cat) => cat.id !== filter.id
                    );
                    setCheckedFilters(newArr);
                  }}
                  key={filter.id}
                >
                  {filter.isSearchTerm ? "Custom Query: " : ""}
                  {filter.name} <span className="ml-2">x</span>
                </li>
              ))}
            {checkedFilters.length > 0 && (
              <button
                className="dark:text-gray-300 underline underline-offset-4"
                onClick={() => setCheckedFilters([])}
              >
                Clear All
              </button>
            )}
          </ul>
        </div>
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

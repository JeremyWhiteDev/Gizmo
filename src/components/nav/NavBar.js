import { getAuth, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUserFromDb } from "../../api/dataAccess";
import { logout } from "../helpers/logout";

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState();

  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const currentUser = useQuery("currentUser", getCurrentUserFromDb, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const checkAuth = () => {
    if (localStorage.getItem("capstone_user")) return true;
  };

  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-purple-900 dark:bg-opacity-60 backdrop-blur-md fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <img
              src={require("../../images/Gizmo-Icon.png")}
              className="h-6 mr-3 sm:h-9"
              alt="Gizmo Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              GIZMO
            </span>
          </a>
          <div className="flex md:order-2">
            {currentUser.data ||
            (checkAuth() && currentUser.data === undefined) ? (
              ""
            ) : (
              <>
                <button
                  type="button"
                  className="bg-white rounded-lg hover:bg-gray-200 mr-3"
                  onClick={() => navigate("/login")}
                >
                  <div className="text-transparent bg-clip-text focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md px-5 py-2.5 text-center  md:mr-0 bg-gradient-to-br bg-white from-purple-800 via-yellow-600 to-pink-600">
                    Log In/Sign Up
                  </div>
                </button>
              </>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              !drawerOpen
                ? " hidden items-center justify-between w-full md:flex md:w-auto md:order-1"
                : "items-center justify-between w-full md:flex md:w-auto md:order-1 h-screen"
            }
            id="navbar-sticky"
          >
            <div className="flex flex-col justify-between p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-purple-700 md:dark:bg-purple-800 dark:border-gray-700 h-5/6 box-border">
              <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-purple-700 md:dark:bg-purple-800 dark:border-gray-700 h-5/6 box-border ">
                <li>
                  <NavLink
                    to="/"
                    onClick={(click) => {
                      //   click.preventDefault();
                      setDrawerOpen(false);
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="gizmos"
                    onClick={(click) => {
                      //   click.preventDefault();
                      setDrawerOpen(false);
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }
                  >
                    Gizmos
                  </NavLink>
                </li>

                {currentUser.data?.id !== undefined ? (
                  <>
                    {/* <li>
                      <NavLink
                        to="feed"
                        onClick={(click) => {
                          //   click.preventDefault();
                          setDrawerOpen(false);
                        }}
                        className={({ isActive }) =>
                          isActive
                            ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                            : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }
                      >
                        Activity Feed
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink
                        to="garage"
                        onClick={(click) => {
                          //   click.preventDefault();
                          setDrawerOpen(false);
                        }}
                        className={({ isActive }) =>
                          isActive
                            ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                            : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }
                      >
                        Garage
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="requests"
                        onClick={(click) => {
                          //   click.preventDefault();
                          setDrawerOpen(false);
                        }}
                        className={({ isActive }) =>
                          isActive
                            ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                            : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }
                      >
                        Requests
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              {currentUser.data?.id !== undefined ? (
                <div className="md:hidden flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white relative">
                  <img
                    className="mr-2 w-8 h-8 rounded-full"
                    src={currentUser.data?.profileImg}
                    alt="user photo"
                  />
                  {currentUser.data?.firstName}
                  <a
                    onClick={async () => {
                      logout.logout(navigate, queryClient);
                      setUserDropdown(false);
                      setDrawerOpen(false);
                    }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white cursor-pointer "
                  >
                    Sign out
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {currentUser.data?.id !== undefined ? (
            <div className=" hidden md:block md:order-3">
              <button
                onClick={() => {
                  setUserDropdown(!userDropdown);
                }}
                className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white relative"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="mr-2 w-8 h-8 rounded-full"
                  src={currentUser.data?.profileImg}
                  alt="user photo"
                />
                {currentUser.data?.firstName}
                <svg
                  className="w-4 h-4 mx-1.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <div
                id="dropdownAvatarName"
                className={`${
                  userDropdown ? "" : "hidden"
                } z-10 w-44 bg-white rounded absolute top-16  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
              >
                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium ">
                    {currentUser.data?.firstName} {currentUser.data?.lastName}
                  </div>
                  <div className="truncate">{currentUser.data?.email}</div>
                </div>
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                >
                  {/* <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </a>
                  </li> */}
                </ul>
                <div className="py-1">
                  <a
                    onClick={async () => {
                      logout.logout(navigate, queryClient);
                      setUserDropdown(false);
                    }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

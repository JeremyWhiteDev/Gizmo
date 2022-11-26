import { useState } from "react";

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState();

  const checkAuth = () => {
    if (localStorage.getItem("capstone_user")) return true;
  };
  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-purple-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Gizmo Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              GIZMO
            </span>
          </a>
          <div className="flex md:order-2">
            {checkAuth() ? (
              ""
            ) : (
              <>
                <button
                  type="button"
                  className="bg-white rounded-lg hover:bg-amber-700 mr-3"
                >
                  <div className="text-transparent bg-clip-text focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md px-5 py-2.5 text-center  md:mr-0 bg-gradient-to-r bg-white from-purple-800 via-yellow-600 to-pink-600">
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
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-amber-400 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Browse Gizmos
                  </a>
                </li>
                {checkAuth() ? (
                  <>
                    <li>
                      <a
                        href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Activity Feed
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Garage
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Requests
                      </a>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>

              <div className="md:hidden">User Profile Section</div>
            </div>
          </div>
          {checkAuth() ? (
            <>
              <div className={"hidden md:block w-10 md:order-3"}>
                <img
                  src={require("../images/Placeholder-image.jpeg")}
                  className="h-6 w-9 mr-3 sm:h-9 rounded-full object-cover"
                  alt="Gizmo Logo"
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

import { useNavigate } from "react-router-dom";
import { getCurrentUserFromLocal } from "../api/dataAccess";

export const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUserFromLocal();

  return (
    <section className="">
      <div className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 -mt-3 blur h-96 md:h-screen"></div>
      <div className="absolute right-0 left-0 top-16 lg:top-48 grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Share your stuff.
          </h1>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Build Community.
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-200">
            We all have tons of gizmos, whatchamacallits, and thingamajigs that
            we only use every once in a while. Gizmo is all about coming
            together as a <span className="font-bold">community,</span> pooling
            our <span className="font-bold">resources,</span> and sharing our{" "}
            <span className="font-bold">household items.</span>
          </p>
          <a
            onClick={() => {
              navigate("/gizmos");
            }}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center cursor-pointer text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Browse Available Gizmos
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          {currentUser ? (
            ""
          ) : (
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center cursor-pointer text-white border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100  
            
              dark:focus:ring-gray-800"
            >
              Log In/Sign Up
            </a>
          )}
        </div>
        <div className="hidden lg:ml-8 lg:mt-0 lg:col-span-5 lg:flex h-96 lg:h-[28rem]">
          <img src={require("../images/Main-Gizmo-Logo.png")} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

import { useNavigate } from "react-router-dom";

export const GizmoCard = ({
  img,
  name,
  model,
  location,
  userImg,
  id,
  variant,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-44 group md:w-72 transition duration-300 border-gray-300 md:hover:scale-105 border-1 shadow-s shadow-gray-400 dark:bg-gray-800 dark:border-gray-700 bg-white text-left rounded-lg">
        {variant === "publicCard" ? (
          <img
            onClick={() => navigate(`/gizmo-details/${id}`)}
            className="md:h-96 w-full transition duration-300 md:opacity-60 cursor:pointer group-hover:opacity-100  h-52 object-cover rounded-t-lg"
            src={img}
          />
        ) : (
          <img
            onClick={() => navigate(`/gizmo-details/${id}`)}
            className="md:h-60 w-full transition duration-300 md:opacity-60 cursor:pointer group-hover:opacity-100 h-52 object-cover rounded-t-lg"
            src={img}
          />
        )}
        <div
          onClick={() => navigate(`/gizmo-details/${id}`)}
          className="cursor-pointer group"
        >
          <p className="text-xl pl-4 md:my-5 md:text-3xl dark:text-white text-gray-600 underline-offset-4 group-hover:underline">
            {name}
          </p>
          <p className="text-s pl-4 md:text-xl mb-4 dark:text-gray-400 text-gray-600 underline-offset-4 group-hover:underline ">
            Model: {model}
          </p>
        </div>
        {variant === "publicCard" ? (
          <div className="flex justify-between">
            <div className="flex items-center mb-3 ml-2">
              <svg
                className="fill-current text-white ml-3 w-4 md:w-6"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="390.5 398 28 40"
                width="28"
                height="40"
              >
                <path
                  className="p-4 fill-current text-gray-400 w-12"
                  d="M 404.5 398 C 396.76 398 390.5 404.26 390.5 412 C 390.5 422.5 404.5 438 404.5 438 C 404.5 438 418.5 422.5 418.5 412 C 418.5 404.26 412.24 398 404.5 398 Z M 404.5 417 C 401.74 417 399.5 414.76 399.5 412 C 399.5 409.24 401.74 407 404.5 407 C 407.26 407 409.5 409.24 409.5 412 C 409.5 414.76 407.26 417 404.5 417 Z"
                />
              </svg>
              <p className="w-28 text-xl text-gray-400 text-left ml-2">
                Zip: {location}
              </p>
            </div>
            <img
              src={userImg}
              className="w-10 object-cover h-10 mr-4 rounded-full hidden md:inline "
            />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex items-center mb-3 ml-2">
              <svg
                className="fill-current text-white ml-3 w-4 md:w-6"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="390.5 398 28 40"
                width="28"
                height="40"
              >
                <path
                  className="p-4 fill-current text-gray-400 w-12"
                  d="M 404.5 398 C 396.76 398 390.5 404.26 390.5 412 C 390.5 422.5 404.5 438 404.5 438 C 404.5 438 418.5 422.5 418.5 412 C 418.5 404.26 412.24 398 404.5 398 Z M 404.5 417 C 401.74 417 399.5 414.76 399.5 412 C 399.5 409.24 401.74 407 404.5 407 C 407.26 407 409.5 409.24 409.5 412 C 409.5 414.76 407.26 417 404.5 417 Z"
                />
              </svg>
              <p className="w-28 text-xl text-gray-400 text-left ml-2">
                {location}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

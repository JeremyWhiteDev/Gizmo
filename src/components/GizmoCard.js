export const GizmoCard = () => {
  return (
    <>
      <div className=" w-44 md:w-96 border-gray-300 border-2 shadow-md shadow-gray-400 bg-white text-center rounded-lg">
        <img
          className="md:h-96 h-52 object-cover rounded-t-lg"
          src={require("../images/Placeholder-image.jpeg")}
        />
        <p className="text-xl md:my-10 md:text-3xl text-gray-600">Tool Name</p>
        <p className="text-s md:text-xl mb-10 text-gray-600">
          Tool Model Number
        </p>
        <div className="flex justify-between">
          <div className="flex items-center mb-3 ml-2">
            <svg
              className="fill-current text-white  w-4 md:w-10"
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
            <p className="w-28 text-xl text-gray-400 text-left ml-1">
              Location
            </p>
          </div>
          <img
            src={require("../images/Placeholder-image.jpeg")}
            className="w-10 object-cover h-10 mr-4 rounded-full hidden md:inline "
          />
        </div>
      </div>
    </>
  );
};

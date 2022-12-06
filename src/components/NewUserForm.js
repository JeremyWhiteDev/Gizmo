import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../api/dataAccess";
import { photoStorage } from "./helpers/photoStorage";

export const NewUserForm = () => {
  const [userForm, updateForm] = useState({
    uid: 0,
    email: "",
    firstName: "",
    lastName: "",
    pronouns: "",
    zipcode: "",
    profileImg: "",
    userCaption: "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  // Handles selecting an image
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // Handles calling the upload image function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      await photoStorage.upload("images", image).then((photoObject) => {
        // Returns image object, you will want to add these properties
        // to an object in your database
        // EX: a user if it's a profile picture

        setImageUrl(photoObject.downloadURL);
        const formCopy = { ...userForm };
        formCopy.profileImg = photoObject.downloadURL;
        const respone = createNewUser(formCopy);
      });
      navigate("/");
    }
  };

  return (
    <>
      <form className=" max-w-md px-5 md:max-w-3xl pt-54 mx-auto">
        <h3 className="dark:text-white text-2xl mb-11">
          Create a User Profile to Continue
        </h3>
        <div className="mb-6">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            maxLength="25"
            value={userForm.firstName}
            onChange={(e) => {
              const formCopy = { ...userForm };
              formCopy.firstName = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your First Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            maxLength="25"
            id="lastName"
            value={userForm.lastName}
            onChange={(e) => {
              const formCopy = { ...userForm };
              formCopy.lastName = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Last Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="userCaption"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Caption (Not Required)
          </label>
          <input
            type="text"
            maxLength="25"
            id="userCaption"
            value={userForm.userCaption}
            onChange={(e) => {
              const formCopy = { ...userForm };
              formCopy.userCaption = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. Tool Collector and WoodWorker"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="pronouns"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pronouns (Not Required)
          </label>
          <input
            type="text"
            id="pronouns"
            maxLength="20"
            value={userForm.pronouns}
            onChange={(e) => {
              const formCopy = { ...userForm };
              formCopy.pronouns = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. She/They or He/Him"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="zipcode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            5-Digit Zipcode
          </label>
          <input
            type="number"
            id="zipcode"
            maxLength="5"
            value={userForm.zipcode}
            onChange={(e) => {
              const formCopy = { ...userForm };
              formCopy.zipcode = e.target.valueAsNumber;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. 37210"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Profile Picture
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(change) => handleChange(change)}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>

        <button
          type="submit"
          onClick={(click) => {
            handleSubmit(click);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

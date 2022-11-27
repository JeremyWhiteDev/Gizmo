import { useState } from "react";
import { createNewGizmo, createNewUser } from "../api/dataAccess";
import { photoStorage } from "./helpers/photoStorage";

export const GizmoForm = () => {
  const [gizmoForm, updateForm] = useState({
    uid: 0,
    nickName: "",
    model: "",
    manufacturerId: "",
    gizmoCategoryId: 0,
    purchaseDate: "",
    amountPaid: "",
    estimatedValue: "",
    img: "",
    isPublic: false,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
        console.log(photoObject.downloadURL);
        const formCopy = { ...gizmoForm };
        formCopy.img = photoObject.downloadURL;
        const respone = createNewGizmo(formCopy);
      });
    }
  };

  return (
    <>
      <form className=" max-w-md px-5 md:max-w-3xl pt-54 mx-auto">
        <h3 className="dark:text-white text-2xl mb-11">Create a New Gizmo</h3>
        <div className="mb-6">
          <label
            htmlFor="nickName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gizmo Nick Name
          </label>
          <input
            type="text"
            id="nickName"
            maxLength="25"
            value={gizmoForm.nickName}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.nickName = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Table Saw"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Model
          </label>
          <input
            type="text"
            maxLength="25"
            id="model"
            value={gizmoForm.model}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.model = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="DCB7958"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="manufacturer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Manufacturer
          </label>
          <input
            type="text"
            maxLength="25"
            id="manufacturer"
            value={gizmoForm.manufacturerId}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.manufacturerId = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. Tool Collector and WoodWorker"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="gizmoCategory"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gizmo Category
          </label>
          <input
            type="text"
            id="gizmoCategory"
            maxLength="20"
            value={gizmoForm.gizmoCategoryId}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.gizmoCategoryId = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1 = Power Tools"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="purchaseDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Purchase Date
          </label>
          <input
            type="date"
            id="zipcode"
            maxLength="15"
            value={gizmoForm.purchaseDate}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.purchaseDate = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="eg. 37210"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="amountPaid"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount Paid $
          </label>
          <input
            type="number"
            id="amountPaid"
            maxLength="15"
            value={gizmoForm.amountPaid}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.amountPaid = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$250"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="estimatedValue"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Estimated Value $
          </label>
          <input
            type="number"
            id="estimatedValue"
            maxLength="15"
            value={gizmoForm.estimatedValue}
            onChange={(e) => {
              const formCopy = { ...gizmoForm };
              formCopy.estimatedValue = e.target.value;
              updateForm(formCopy);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="$250"
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="isPublic"
              type="checkbox"
              value={gizmoForm.isPublic}
              checked={gizmoForm.isPublic}
              onChange={(e) => {
                const formCopy = { ...gizmoForm };
                formCopy.isPublic = e.target.checked;
                updateForm(formCopy);
              }}
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isPublic"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make this tool Public?
          </label>
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

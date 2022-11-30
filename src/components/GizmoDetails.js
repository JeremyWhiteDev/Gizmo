import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleGizmo } from "../api/dataAccess";

export const GizmoDetails = () => {
  const [gizmo, setGizmo] = useState([]);
  const { gizmoId } = useParams();
  //img

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleGizmo(gizmoId);
      setGizmo(data);
    };
    fetchData();
  }, []);
  //
  return (
    <>
      <div class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-6xl mx-auto hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:max-w-3xl md:rounded-none md:rounded-l-lg"
          src={gizmo.img}
          alt=""
        />
        <div class="flex flex-col justify-between p-5 leading-normal md:w-96">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {gizmo.user?.firstName}'s {gizmo.nickName}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Gizmo Model Number: {gizmo.model}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Gizmo Location: {gizmo.user?.zipcode}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Gizmo Location: {gizmo.user?.zipcode}
          </p>
        </div>
      </div>
    </>
  );
};

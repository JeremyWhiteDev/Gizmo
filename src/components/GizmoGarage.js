import { useEffect, useState } from "react";
import { getPaginatedGizmosAndLocations } from "../api/dataAccess";
import { GizmoCard } from "./GizmoCard";

export const GizmoGarage = () => {
  const [gizmos, setGizmos] = useState([]);
  const [filteredGizmos, setFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPaginatedGizmosAndLocations(1, "id", 20);
      setGizmos(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="dark:text-white">Gizmo Garage</h1>
      <div className="flex gap-y-5 flex-wrap p-2 gap-x-6 mx-auto max-w-xl md: pl-6 md:max-w-screen-xl  ">
        {gizmos.map((gizmo) => {
          return (
            <GizmoCard
              img={gizmo.img}
              name={gizmo.nickName}
              model={gizmo.model}
              location={gizmo.user?.zipcode}
              userImg={gizmo.user?.avatarImg}
            />
          );
        })}
      </div>
    </>
  );
};

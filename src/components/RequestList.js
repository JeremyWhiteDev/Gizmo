import { useEffect, useState } from "react";
import { getUserGizmoRequests } from "../api/dataAccess";

export const RequstList = () => {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserGizmoRequests();
      setUserRequests(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {userRequests.map((request) => (
        <>
          <p>request Start {request.startDate}</p>
        </>
      ))}
    </>
  );
};

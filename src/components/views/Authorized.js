import { Navigate, useLocation } from "react-router-dom";
import { checkForUserInfo } from "../../api/dataAccess";
import { useEffect } from "react";

export const Authorized = ({ children }) => {
  const location = useLocation();

  let userProfile;
  const userStatus = async () => {
    const profileExists = await checkForUserInfo();
    userProfile = profileExists;
    console.log(userProfile);
  };

  useEffect(() => {
    userStatus();
  }, []);

  if (localStorage.getItem("capstone_user") && userProfile) {
    return children;
  } else if (localStorage.getItem("capstone_user") && !userProfile) {
    return (
      <Navigate
        to={`/newUser/${location.search}`}
        replace
        state={{ location }}
      />
    );
  } else {
    return (
      <Navigate to={`/login/${location.search}`} replace state={{ location }} />
    );
  }
};

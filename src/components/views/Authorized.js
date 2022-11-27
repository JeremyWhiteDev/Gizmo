import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { checkForUserInfo } from "../../api/dataAccess";
import { useEffect } from "react";
import { Login } from "../auth/Login";
import { NavigateToLogin } from "./NavigateToLogin";

export const Authorized = ({ children }) => {
  const location = useLocation();
  let userProfile;

  useEffect(() => {
    checkProfile();
  }, []);
  const checkProfile = async () => {
    const result = await checkForUserInfo();
    console.log(result);
    userProfile = result;
  };

  if (localStorage.getItem("capstone_user") && userProfile) {
    return children;
  } else {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <NavigateToLogin />
      </>
    );
  }
};

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { logout } from "../helpers/logout";
import { checkForUserInfo } from "../../api/dataAccess";

import { useEffect } from "react";
import { NavigateToNewUserForm } from "./NavigateToNewUserForm";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const ApplicationViews = () => {
  let navigate = useNavigate();
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

  // Move this to where ever you end up putting your logout button
  const onLogout = () => {
    logout.logout(navigate);
  };

  if (localStorage.getItem("capstone_user") && userProfile) {
    //For registered users that have setup a profile in the system
    return (
      <>
        <Routes>
          <Route path="/garage" element={<h1>Gizmo Request</h1>} />
          <Route
            path="/gizmo/request/:gizmoId"
            element={<h1>Gizmo Request</h1>}
          />
          <Route path="/feed" element={<h1>Feed Page</h1>} />
          <Route path="/gizmos" element={<h1>Browse Gizmo Page</h1>} />
        </Routes>
      </>
    );
  } else if (localStorage.getItem("capstone_user") && !userProfile) {
    //Authorized user but doesn't have a profile redirects to the create profile page
    return (
      <>
        <Routes>
          <Route path="/profile-create" element={<h1>Create Profile</h1>} />
          <Route path="*" element={<NavigateToNewUserForm />} />
        </Routes>
      </>
    );
  } else {
    //unauthorized users
    return (
      <Routes>
        <Route path="/gizmos" element={<h1>Gizmo Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
};

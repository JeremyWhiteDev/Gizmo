import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { logout } from "../helpers/logout";
import { checkForUserInfo } from "../../api/dataAccess";

import { useEffect, useState, useRef } from "react";
import { NavigateToNewUserForm } from "./NavigateToNewUserForm";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { NewUserForm } from "../NewUserForm";
import { GizmoForm } from "../GizmoForm";
import { GizmoGarage, GizmoList } from "../GizmoList";
import { GizmoInventory } from "../GizmoInventory";
import { GizmoDetails } from "../GizmoDetails";
import { RequestForm } from "../RequestForm";
import { ReqeustList, RequestList } from "../RequestList";

export const ApplicationViews = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const location = useLocation();
  const userProfile = useRef();

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const result = await checkForUserInfo();
    userProfile.current = result;
    setLoading(false);
  };

  // Move this to where ever you end up putting your logout button
  // const onLogout = () => {
  //   logout.logout(navigate);
  // };

  if (
    localStorage.getItem("capstone_user") &&
    userProfile.current &&
    !loading
  ) {
    //For registered users that have setup a profile in the system
    return (
      <>
        <Routes>
          <Route path="/garage" element={<GizmoInventory />} />
          <Route path="/requests" element={<RequestList />} />
          <Route path="/gizmo/request/:gizmoId" element={<RequestForm />} />
          <Route path="/feed" element={<h1>Feed Page</h1>} />
          <Route path="/gizmos" element={<GizmoList />} />
          <Route path="/gizmo-details/:gizmoId" element={<GizmoDetails />} />
          <Route path="/add-gizmo" element={<GizmoForm />} />
          <Route
            path="/edit-gizmo/:gizmoId"
            element={<GizmoForm variant="editForm" />}
          />
          <Route
            path="*"
            element={<h1>Oops! Something went wrong accessing that URL</h1>}
          />
        </Routes>
      </>
    );
  } else if (
    localStorage.getItem("capstone_user") &&
    !userProfile.current &&
    !loading
  ) {
    //Authorized user but doesn't have a profile redirects to the create profile page
    return (
      <>
        <Routes>
          <Route path="/profile-create" element={<NewUserForm />} />
          <Route path="*" element={<NavigateToNewUserForm />} />
        </Routes>
      </>
    );
  } else {
    //unauthorized users
    return (
      <Routes>
        <Route path="/gizmos" element={<GizmoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<h1>Oops! Something went wrong accessing that URL</h1>}
        />
      </Routes>
    );
  }
};

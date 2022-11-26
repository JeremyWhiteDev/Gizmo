import { Route, Routes, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { logout } from "../helpers/logout";

export const ApplicationViews = () => {
  let navigate = useNavigate();

  // Move this to where ever you end up putting your logout button
  const onLogout = () => {
    logout.logout(navigate);
  };

  return (
    <>
      <Routes>
        <Route path="/garage" element={<h1>Garage</h1>} />
        <Route
          path="/gizmo/request/:gizmoId"
          element={<h1>Gizmo Request Page</h1>}
        />
      </Routes>
    </>
  );
};

{
  /* <h1>A Blank Page!!</h1> */
}
{
  /* logout button */
}
{
  /* <button type="submit" onClick={onLogout}> */
}
{
  /* Logout */
}
{
  /* </button> */
}
{
  /* move this component to where you want your PhotoUpload */
}
{
  /* <PhotoUpload /> */
}

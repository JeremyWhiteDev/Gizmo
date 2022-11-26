import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const Gizmo = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/" element={<h1>Home Page</h1>} />
      <Route exact path="/gizmos" element={<h1>Gizmo Page</h1>} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
              <ApplicationViews />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};

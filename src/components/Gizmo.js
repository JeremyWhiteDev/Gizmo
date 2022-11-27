import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { checkForUserInfo } from "../api/dataAccess";

export const Gizmo = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        exact
        path="/"
        element={
          <>
            <NavBar />
            checkForUserInf
            <h1 className="mt-20 h-screen text-3xl font-bold underline">
              Home Page
            </h1>
            <Footer />
          </>
        }
      />
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

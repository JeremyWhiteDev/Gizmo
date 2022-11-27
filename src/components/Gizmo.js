import {
  Navigate,
  Outlet,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { checkForUserInfo } from "../api/dataAccess";
import { useEffect } from "react";

export const Gizmo = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route exact path="/" element={<h1 className="mt-20">Home Page</h1>} />

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
      </Route>
    </Routes>
  );
};

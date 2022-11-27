import {
  Navigate,
  Outlet,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { checkForUserInfo } from "../api/dataAccess";
import { useEffect } from "react";

export const Gizmo = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <main className="mt-20 min-h-screen">
                <Outlet />
              </main>
              <Footer />
            </>
          }
        >
          <Route exact path="/" element={<h1>Homepage</h1>} />
          <Route path="*" element={<ApplicationViews />} />
        </Route>
      </Routes>
    </>
  );
  return;
};

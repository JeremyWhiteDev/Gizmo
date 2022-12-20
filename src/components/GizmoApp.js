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
import { NavBar } from "./nav/NavBar";
import { Footer } from "./nav/Footer";
import { checkForUserInfo } from "../api/dataAccess";
import { useEffect } from "react";
import { HomePage } from "./HomePage";

export const Gizmo = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <main className="pt-20 min-h-screen bg-slate-900 pb-16">
                <Outlet />
              </main>
              <Footer />
            </>
          }
        >
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<ApplicationViews />} />
        </Route>
      </Routes>
    </>
  );
  return;
};

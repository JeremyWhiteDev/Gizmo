import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export const NavigateToLogin = () => {
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("effect ran");
    navigate("/login");
    // <Navigate to={`/login/${location.search}`} replace state={{ location }} />;
  }, []);
};

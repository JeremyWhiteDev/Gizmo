import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export const NavigateToNewUserForm = () => {
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("effect ran");
    navigate("/profile-create");
    // <Navigate to={`/login/${location.search}`} replace state={{ location }} />;
  }, []);
};

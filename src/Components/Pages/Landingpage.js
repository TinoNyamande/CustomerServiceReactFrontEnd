import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function Landingpage() {
  const { loggedIn, login, logout, isAdmin, makeAdmin, removeAdmin } =
    useAuth();

  const tokenExists = !!Cookies.get("token");
  if (!tokenExists) {
    logout();
    removeAdmin();
    return <Navigate to="/login" replace />;
  } else {
    const token = Cookies.get("token");
    const payload = jwtDecode(token);
    console.log(payload);
    const role = payload["role"];
    if (role == "admin") {
      login();
      makeAdmin();
      return <Navigate to="/admin-dashboard" />;
    } else {
      removeAdmin();
      login();
      return <Navigate to="/dashboard" />;
    }
  }
}

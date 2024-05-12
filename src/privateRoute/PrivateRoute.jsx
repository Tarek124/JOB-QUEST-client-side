import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  } else {
    return loading ? (
      <div className="w-full h-[80vh] flex justify-center items-center ">
        <CircularProgress />
      </div>
    ) : (
      <Navigate state={location.pathname} to={"/login"} />
    );
  }
};

export default PrivateRoute;

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  } else {
    return loading ? (
      <Loading />
    ) : (
      <Navigate state={location.pathname} to={"/login"} />
    );
  }
};

export default PrivateRoute;

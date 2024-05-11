import { useContext } from "react";
import { AppContext } from "../AuthProvider/AuthProvider";

const useAuth = () => {
  const myData = useContext(AppContext);
  return myData;
};

export default useAuth;

import { CircularProgress } from "@mui/material";
import useAuth from "../hooks/useAuth";
import Banner from "./Banner/Banner";

export default function Homepage() {
  const data = useAuth();
  return data?.loading ? (
    <div className="w-full h-[80vh] flex justify-center items-center ">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <Banner />
    </div>
  );
}

import useAuth from "../hooks/useAuth";
import Banner from "./Banner/Banner";
import JobByCategory from "./JobByCategory/JobByCategory";
import Loading from "../component/Loading/Loading";

export default function Homepage() {
  const data = useAuth();

  return data?.loading ? (
    <Loading />
  ) : (
    <div>
      <Banner />
      <JobByCategory />
    </div>
  );
}

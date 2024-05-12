import { Typography } from "@mui/material";
import AllJobCard from "./AllJobCard/AllJobCard";
import useAuth from "../../hooks/useAuth";

const AllJobs = () => {
  const { jobs } = useAuth();
  return (
    <div className="xl:px-32 xl:py-20 p-6">
      <Typography color="text.secondary">
        Found Result {jobs?.length}
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((item) => (
          <AllJobCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;

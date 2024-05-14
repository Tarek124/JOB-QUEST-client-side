import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { instance } from "../../main";
import useAuth from "../../hooks/useAuth";
import MyJobCard from "./MyJobCard/MyJobCard";
import Swal from "sweetalert2";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    instance
      .get(`/user/?email=${user?.email}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  //delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to Delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`deleteJob/?id=${id}`)
          .then((res) => {
            if (res.data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Job has been deleted!",
                icon: "success",
              });
              const newJob = jobs.filter((job) => job._id !== id);
              setJobs(newJob);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      className="xl:px-32 xl:py-20 p-6"
    >
      <Typography color="text.secondary">
        {user?.displayName || user?.email}
      </Typography>
      {jobs.length == 0 ? (
        <div className="mt-10">
          <h1 className="text-xl">Nothing Found...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((item) => (
            <MyJobCard key={item._id} item={item} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default MyJobs;

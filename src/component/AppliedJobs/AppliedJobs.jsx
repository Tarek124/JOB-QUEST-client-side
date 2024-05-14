import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { instance } from "../../main.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AppliedJobs = () => {
  const { user, myTheme } = useAuth();
  const [allAppliedJob, setAllAppliedJob] = useState(null);
  console.log(allAppliedJob);
  useEffect(() => {
    instance
      .get(`/allApplyForJob/?email=${user?.email}&name=${user?.displayName}`)
      .then((res) => {
        console.log(res.data);
        setAllAppliedJob(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", myTheme);
  }, [myTheme]);
  const handleDeleteAppliedjob = (id) => {
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
          .delete(`deleteAppliedJob/?id=${id}`)
          .then((res) => {
            if (res.data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Job has been deleted!",
                icon: "success",
              });
              const newJob = allAppliedJob.filter((job) => job._id !== id);
              setAllAppliedJob(newJob);
            }
          })
          .catch((err) => {
            console.log(err)
          });
      }
    });
  };
  return allAppliedJob ? (
    <div className="lg:px-20 lg:py-10 overflow-x-auto my-8">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Deadline</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJob.map((item) => (
            <tr key={item._id} className="">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item?.banner}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item?.title}</div>
                    <div className="text-sm opacity-50">{item?.category}</div>
                  </div>
                </div>
              </td>
              <td>
                {item?.job_category}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {item?.employer}
                </span>
              </td>
              <td>{item?.deadline}</td>
              <th>
                <Link className="mr-2" to={`/jobDetails/${item.job_id}`}>
                  <button className="btn btn-ghost btn-xs">details</button>
                </Link>
                <IconButton
                  onClick={() => {
                    handleDeleteAppliedjob(item._id);
                  }}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="w-full h-[80vh] flex justify-center items-center ">
      <CircularProgress />
    </div>
  );
};

export default AppliedJobs;

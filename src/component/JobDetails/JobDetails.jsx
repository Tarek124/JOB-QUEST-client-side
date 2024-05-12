import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../main";
import { Button, Typography } from "@mui/material";
import "animate.css";

const JobDetails = () => {
  const [job, setJob] = useState({});
  const [apply, setApply] = useState("Apply");
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`jobdetails/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="xl:p-32 p-6 min-h-[65vh] animate__fadeInLeft  animate__animated">
      <p className="font-bold text-3xl text-slate-600 py-1">
        We Are Looking for a
      </p>
      <h1 className="font-bold text-3xl md:text-6xl ">
        <span className="border-b-2 border-[#1983ec] bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          {job?.title}
        </span>
      </h1>
      <h2 className="mt-6  mb-1 font-semibold text-xl text-slate-600 ">
        Description
      </h2>
      <p className="md:pr-32 lg:w-1/2 text-slate-500">{job?.description}</p>
      <div className="mt-2 text-slate-600">
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Publised Date: {job?.postingDate}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Deadline: {job?.deadline}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Salary: {job?.salaryRange}
        </Typography>{" "}
        <Typography sx={{ fontSize: 14 }} gutterBottom>
        Number of Applicants: {job?.applicants}
        </Typography>
      </div>
      <div
        className={`mt-5  ${apply == "Pending" ? "animate__hinge" : ""}`}
        onClick={() => {
          setApply("Pending");
        }}
      >
        <Button
          disabled={apply == "Pending" ? true : false}
          sx={{ mb: 2 }}
          variant="contained"
        >
          {apply}
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;

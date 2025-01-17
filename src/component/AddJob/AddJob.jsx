import { Box, Button, MenuItem, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { instance } from "../../main";
import useSwal from "../../hooks/useSwal";

const currencies = ["On Site", "Remote", "Part-Time", "Hybrid"];
const category = ["Software Development", "Marketing", "Finance", "Design"];
const salaryRange = [
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$30,000 - $40,000",
  "$50,000 - $70,000",
  "$60,000 - $80,000",
  "$70,000 - $90,000",
  "$80,000 - $100,000",
];

const AddJob = () => {
  const { user, myTheme,forUpdateAllData, setForUpdateAllData } = useAuth();
  const [jobPostingDate, setPostingDate] = useState(new Date());
  const [jobDeadline, setDeadline] = useState(new Date());
  const theme = myTheme == "dark" ? "bg-[#121212] border-[#5A5A5A]" : "";
  const label = myTheme == "dark" ? "text-[#B8B8AE]" : "text-[#212121]";
  const deadline = new Intl.DateTimeFormat("en-US").format(jobDeadline);
  const postingDate = new Intl.DateTimeFormat("en-US").format(jobPostingDate);
  const { swalErr, swalSuccess } = useSwal();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Create FormData object to collect form data
    const formData = new FormData(form);

    // Convert FormData to object
    const formObject = {
      deadline,
      postingDate,
      email: user?.email,
      employer: user?.displayName || user.email,
    };
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    instance
      .post("addedJobs", formObject)
      .then((res) => {
        console.log(res);
        swalSuccess("Job added successfully");
        setForUpdateAllData(!forUpdateAllData);
        form.reset();
      })
      .catch((err) => {
        swalErr("somthing is wrong");
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      className="lg:px-32 lg:py-20 p-6"
    >
      <div>
        <div className="my-5">
          <h1 className="text-3xl font-bold">Add A New Job</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              className="md:w-1/2"
              name="title"
              required
            />
            <TextField
              id="outlined-basic"
              label="Job Banner URL"
              variant="outlined"
              className="md:w-1/2"
              name="banner"
              required
            />
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-basic"
              label="Job Description"
              multiline
              rows={4}
              className="md:w-1/2"
              name="description"
              required
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Job Category"
              className="md:w-1/2"
              name="job_category"
              required
            >
              {currencies.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-select-currency"
              select
              label="Salary Range"
              className="md:w-1/2"
              name="salaryRange"
              required
            >
              {salaryRange.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Job Applicants"
              variant="outlined"
              defaultValue={"0"}
              className="md:w-1/2"
              name="applicants"
              required
              type="number"
            />
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className="md:w-1/2"
              defaultValue={user?.displayName}
              disabled
              name="employer"
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="md:w-1/2"
              defaultValue={user?.email}
              disabled
              name="email"
              required
            />
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <label className="form-control w-full z-40">
              <div className="label">
                <span className={label}>Job Posting Date</span>
              </div>
              <DatePicker
                className={`border text-[#B8B8AE] ${theme} ${label} py-4 px-[14px] w-full`}
                selected={jobPostingDate}
                dateFormat="yyyy/MM/dd"
                onChange={(date) => setPostingDate(date)}
              />
            </label>
            <label className="form-control w-full z-40">
              <div className="label">
                <span className={label}>Application Deadline</span>
              </div>
              <DatePicker
                className={`border ${theme} ${label}  py-4 px-[14px] w-full`}
                selected={jobDeadline}
                dateFormat="yyyy/MM/dd"
                onChange={(date) => setDeadline(date)}
              />
            </label>
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              className="md:w-1/2"
              name="category"
              required
            >
              {category.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button type="submit" variant="contained">
            Post
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default AddJob;

/*
category
job_category 
employer  
title
description
postingDate
deadline
salaryRange
applicants
banner
email 
*/

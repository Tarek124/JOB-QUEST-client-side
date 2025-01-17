import { Box, Button, MenuItem, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useSwal from "../../../hooks/useSwal";
import { instance } from "../../../main";
import { useParams } from "react-router-dom";

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

const UpdateJob = () => {
  // eslint-disable-next-line no-unused-vars
  const [job, setJob] = useState({});
  const [forUpdate, setForUpdate] = useState(true);
  const { id } = useParams();
  const { user, myTheme, forUpdateAllData, setForUpdateAllData } = useAuth();
  const [jobPostingDate, setPostingDate] = useState(new Date());
  const [jobDeadline, setDeadline] = useState(new Date());
  const [formValues, setFormValues] = useState({
    _id: "",
    title: "",
    banner: "",
    description: "",
    job_category: "",
    salaryRange: "",
    applicants: 0,
    category: "",
  });

  const theme = myTheme == "dark" ? "bg-[#121212] border-[#5A5A5A]" : "";
  const label = myTheme == "dark" ? "text-[#B8B8AE]" : "text-[#212121]";
  const deadline = new Intl.DateTimeFormat("en-US").format(jobDeadline);
  const postingDate = new Intl.DateTimeFormat("en-US").format(jobPostingDate);
  const { swalErr, swalSuccess } = useSwal();

  useEffect(() => {
    instance
      .get(`updateJobs/${id}`)
      .then((res) => {
        setJob(res.data);
        setFormValues({
          _id: res.data._id || "",
          title: res.data.title || "",
          banner: res.data.banner || "",
          description: res.data.description || "",
          job_category: res.data.job_category || "",
          salaryRange: res.data.salaryRange || "",
          applicants: res.data.applicants || 0,
          category: res.data.category || "",
        });
        setPostingDate(new Date(res.data.postingDate));
        setDeadline(new Date(res.data.deadline));
      })
      .catch((err) => console.log(err));
  }, [user, forUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObject = {
      ...formValues,
      deadline,
      postingDate,
      email: user?.email,
      employer: user?.displayName || user.email,
    };

    instance
      .put("/updateJobs", formObject)
      .then((res) => {
        console.log(res);
        swalSuccess("Updated jobs information");
        setForUpdate(!forUpdate);
        setForUpdateAllData(!forUpdateAllData);
      })
      .catch((err) => {
        swalErr("somthing is wrong");
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
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
          <h1 className="text-3xl font-bold">Update Job</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-required"
              label="Job Title"
              variant="outlined"
              className="md:w-1/2"
              name="title"
              required
              value={formValues.title}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Job Banner URL"
              variant="outlined"
              className="md:w-1/2"
              name="banner"
              required
              value={formValues.banner}
              onChange={handleInputChange}
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
              value={formValues.description}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Job Category"
              className="md:w-1/2"
              name="job_category"
              required
              value={formValues.job_category}
              onChange={handleInputChange}
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
              value={formValues.salaryRange}
              onChange={handleInputChange}
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
              className="md:w-1/2"
              name="applicants"
              required
              type="number"
              value={formValues.applicants}
              onChange={handleInputChange}
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
              value={formValues.category}
              onChange={handleInputChange}
            >
              {category.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default UpdateJob;

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

import { Box, MenuItem, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

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
  const { user, myTheme } = useAuth();
  const [postingDate, setPostingDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const theme = myTheme == "dark" ? "bg-[#121212] border-[#5A5A5A]" : "";
  const label = myTheme == "dark" ? "text-[#B8B8AE]" : "text-[#212121]";
  console.log(postingDate, deadline)
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
        <form>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <TextField
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              className="md:w-1/2"
              name="jobTitle"
            />
            <TextField
              id="outlined-basic"
              label="Job Banner URL"
              variant="outlined"
              className="md:w-1/2"
              name="banner"
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
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Job Category"
              className="md:w-1/2"
              name="jobCategory"
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
              name="jobApplicants"
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
              name="name"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="md:w-1/2"
              defaultValue={user?.email}
              disabled
              name="email"
            />
          </div>
          <div className="w-full flex-col md:flex-row flex gap-4 my-4">
            <label className="form-control w-full z-40">
              <div className="label">
                <span className={label}>Job Posting Date</span>
              </div>
              <DatePicker
                className={`border text-[#B8B8AE] ${theme} ${label} py-4 px-[14px] w-full`}
                selected={postingDate}
                onChange={(date) => setPostingDate(date)}
              />
            </label>
            <label className="form-control w-full z-40">
              <div className="label">
                <span className={label}>Application Deadline</span>
              </div>
              <DatePicker
                className={`border ${theme} ${label}  py-4 px-[14px] w-full`}
                selected={deadline}
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
            >
              {category.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default AddJob;

// 9. Add A Job page will be a private route(only logged in users can add jobs):
// Create an Add A Job page where there will be a form having the following fields:
//**- Picture URL of the Job Banner,
//** */ - Job Title,
//** */ - Logged In User Name and email (read-only)
//* - Job Category ( For example: On Site, Remote, Part-Time, Hybrid)
// *- Salary range,
//* - Job Description,
// - Job Posting Date
// - Application Deadline Use the [Date Picker Package]
//* - Job Applicants Number(by default it will be 0)

import { Box, MenuItem, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const { user } = useAuth();
  console.log(user.displayName);
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
          <div className="w-full flex gap-2">
            <TextField
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              className="w-1/2"
            />
            <TextField
              id="outlined-basic"
              label="Job Banner URL"
              variant="outlined"
              className="w-1/2"
            />
          </div>
          <div className="w-full flex gap-2 my-5">
            <TextField
              id="outlined-basic"
              label="Job Description"
              multiline
              rows={4}
              className="w-1/2"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Job Category"
              className="w-1/2"
            >
              {currencies.map((option, inx) => (
                <MenuItem key={inx} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="w-full flex gap-2 my-5">
            <TextField
              id="outlined-select-currency"
              select
              label="Salary Range"
              className="w-1/2"
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
              className="w-1/2"
            />
          </div>
          <div className="w-full flex gap-2 my-5">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              className="w-1/2"
              defaultValue={user?.displayName}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="w-1/2"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="w-full flex gap-2 my-5">
            <DatePicker />
          </div>
          <div className="w-full flex gap-2 my-5">
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              className="w-1/2"
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

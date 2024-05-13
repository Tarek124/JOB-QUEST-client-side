import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import AllJobCard from "./AllJobCard/AllJobCard";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { instance } from "../../main";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const searchJobs = (e) => {
    e.preventDefault();
    try {
      instance
        .get(`/jobs/search?query=${encodeURIComponent(searchInput)}`)
        .then((res) => setJobs(res.data));
    } catch (error) {
      setErrorMsg(error);
    }
    console.log(searchInput);
  };
  useEffect(() => {
    instance
      .get("allJobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      className="xl:px-32 xl:py-20 p-6"
    >
      <div className="text-center my-4">
        <Paper
          onSubmit={searchJobs}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Job"
            inputProps={{ "aria-label": "search google maps" }}
            value={searchInput}
            onChange={handleInputChange}
          />
          <IconButton
            onClick={searchJobs}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Typography color="text.secondary">
        Found Result {jobs?.length}
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((item) => (
          <AllJobCard key={item._id} item={item} />
        ))}
      </div>
    </Box>
  );
};

export default AllJobs;

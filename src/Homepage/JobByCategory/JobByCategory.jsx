import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import JobCard from "./JobCard/JobCard";
import useAuth from "../../hooks/useAuth";

export default function JobByCategory() {
  const [value, setValue] = useState("1");
  const { jobs } = useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Separate arrays for different categories
  const [softwareDevelopmentJobs, setSoftwareDevelopmentJobs] = useState([]);
  const [marketingJobs, setMarketingJobs] = useState([]);
  const [designJobs, setDesignJobs] = useState([]);
  const [finance, setFinance] = useState([]);

  // Function to filter jobs based on category
  const categorizeJobs = () => {
    const softwareDevelopment = jobs.filter(
      (job) => job.category === "Software Development"
    );
    const marketing = jobs.filter((job) => job.category === "Marketing");
    const design = jobs.filter((job) => job.category === "Design");
    const finance = jobs.filter((job) => job.category === "Finance");
    setSoftwareDevelopmentJobs(softwareDevelopment);
    setMarketingJobs(marketing);
    setDesignJobs(design);
    setFinance(finance);
  };

  useEffect(() => {
    categorizeJobs();
  }, [jobs]);
  return (
    <div className="xl:px-32 p-6">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Software Development" value="1" />
              <Tab label="Marketing" value="2" />
              <Tab label="Design" value="3" />
              <Tab label="Finance" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {softwareDevelopmentJobs?.map((item) => (
                <JobCard key={item._id} item={item} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketingJobs?.map((item) => (
                <JobCard key={item._id} item={item} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designJobs?.map((item) => (
                <JobCard key={item._id} item={item} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {finance?.map((item) => (
                <JobCard key={item._id} item={item} />
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

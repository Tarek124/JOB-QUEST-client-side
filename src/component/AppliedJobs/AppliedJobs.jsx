import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { instance } from "../../main.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading.jsx";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const category = [
  "All",
  "Software Development",
  "Marketing",
  "Finance",
  "Design",
];
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerItem: {
    width: "25%",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  item: {
    width: "25%",
    fontSize: 14,
  },
});
const AppliedJobs = () => {
  const { user, myTheme } = useAuth();
  const [allAppliedJob, setAllAppliedJob] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    instance
      .get(
        `/allApplyForJob/?email=${user?.email}&name=${user?.displayName}&category=${selectedCategory}`
      )
      .then((res) => {
        console.log(res.data);
        setAllAppliedJob(res.data);
      })
      .catch((err) => console.log(err));
  }, [user, selectedCategory]);

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
            console.log(err);
          });
      }
    });
  };

  console.log(selectedCategory);
  return allAppliedJob ? (
    <div className="lg:px-20 lg:py-10 overflow-x-auto my-8">
      <div className="mb-4 px-4">
        <TextField
          id="outlined-select-currency"
          select
          label="Category"
          className="w-52"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {category.map((option, inx) => (
            <MenuItem key={inx} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
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
      <div className="px-4 my-4">
        <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
          <PDFDownloadLink
            document={<AppliedJobsPDF allAppliedJob={allAppliedJob} />}
            fileName="applied-jobs.pdf"
          >
            {({ loading }) => (loading ? "Loading document..." : "DOWNLOAD")}
          </PDFDownloadLink>
        </Button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

const AppliedJobsPDF = ({ allAppliedJob }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Applied Jobs</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerItem}>Title</Text>
        <Text style={styles.headerItem}>Details</Text>
        <Text style={styles.headerItem}>Deadline</Text>
        <Text style={styles.headerItem}>Action</Text>
      </View>
      {allAppliedJob.map((item) => (
        <View key={item._id} style={styles.row}>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.item}>{item.job_category}</Text>
          <Text style={styles.item}>{item.deadline}</Text>
          <Text style={styles.item}>Delete</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default AppliedJobs;

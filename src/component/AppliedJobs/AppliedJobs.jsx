import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { instance } from "../../main.jsx";

const AppliedJobs = () => {
  const { user } = useAuth();
  const [allAppliedJob, setAllAppliedJob] = useState({});
  console.log(user);
  useEffect(() => {
    instance
      .get(`/allApplyForJob/?email=${user?.email}&name=${user?.displayName}`)
      .then((res) => {
        console.log(res.data);
        setAllAppliedJob(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);



  return (
    <div style={{ height: 400, width: "100%" }}>

    </div>
  );
};

export default AppliedJobs;

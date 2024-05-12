import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../Homepage/Homepage";
import AllJobs from "../component/AllJobs/AllJobs";
import AppliedJobs from "../component/AppliedJobs/AppliedJobs";
import MyJobs from "../component/MyJobs/MyJobs";
import AddJob from "../component/AddJob/AddJob";
import Login from "../Register/Login";
import Registation from "../Register/Registation";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import JobDetails from "../component/JobDetails/JobDetails";
import PrivateRoute from "../privateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/alljobs", element: <AllJobs /> },
      { path: "/appliedjobs", element: <AppliedJobs /> },
      { path: "/addajob", element: <AddJob /> },
      { path: "/myjobs", element: <MyJobs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registation /> },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

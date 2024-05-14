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
import Blog from "../component/Blog/Blog";
import ViewDetails from "../component/Blog/ViewDetails/ViewDetails";
import UpdateJob from "../component/MyJobs/UpdateJob/UpdateJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/alljobs", element: <AllJobs /> },

      { path: "/blogs", element: <Blog /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registation /> },
      { path: "/viewDetails/:id", element: <ViewDetails /> },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/addajob",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },

      {
        path: "/appliedjobs",
        element: (
          <PrivateRoute>
            <AppliedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateJob/:id",
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

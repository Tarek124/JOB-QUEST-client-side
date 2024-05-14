import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000/",
  timeout: 1000,
  withCredentials: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

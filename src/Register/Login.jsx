import GoogleIcon from "@mui/icons-material/Google";
import Lottie from "lottie-react";
import myAnimation from "./Animation - 1715438369048.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSwal from "../hooks/useSwal";

const Login = () => {
  const data = useAuth();
  const { swalErr, swalSuccess } = useSwal();
  const location = useLocation();
  const myLocation = location.state ? location.state : "/";
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    data
      .login(email, password)
      .then(() => {
        swalSuccess("Login successfully");
        navigate(myLocation);
        form.reset();
      })
      .catch((err) => {
        swalErr("password or email is incorrect!");
        console.log(err);
      });
  };
  const googleLogin = () => {
    data
      .googleSignIn()
      .then(() => {
        swalSuccess("Login successfully");
        navigate(myLocation);
      })
      .catch((err) => {
        console.log(err);
        swalErr("Login Failed");
      });
  };
  return (
    <div className="bg-[#E7E2FF] p-4 flex justify-center">
      <div className="bg-white my-8 lg:w-[50vw] w-full overflow-hidden flex rounded-xl shadow-lg items-center">
        <div
          onSubmit={handleLogin}
          className="lg:w-[50vw] w-full flex flex-col items-center p-6 lg:p-20 gap-4"
        >
          <form className=" w-full flex flex-col items-center gap-4">
            <h1 className="text-xl font-semibold">LOGIN</h1>
            <label className="input bg-[#E7E2FF] flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                required
                name="email"
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>
            <label className="input bg-[#E7E2FF] w-full flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                name="password"
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>
            <button className="btn text-white bg-[#1976D2] w-full">
              Login Now
            </button>
          </form>
          <div className="flex items-center w-full gap-2 justify-center mt-3">
            <div className="h-[1px] bg-[#E7E2FF] w-1/4" />
            <p>
              <span className="font-semibold">Login </span>with Others
            </p>
            <div className="h-[1px] bg-[#E7E2FF] w-1/4" />
          </div>
          <button onClick={googleLogin} className="mt-4 btn w-full">
            <GoogleIcon /> Login with google
          </button>
          <p className="text-sm mt-2">
            Don’t Have An Account ?{" "}
            <Link to="/register" className="btn-link">
              Register
            </Link>{" "}
          </p>
        </div>
        <div className="lg:w-[50vw] h-full lg:flex hidden  bg-gradient-to-r from-sky-500 to-indigo-500">
          <Lottie animationData={myAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Login;

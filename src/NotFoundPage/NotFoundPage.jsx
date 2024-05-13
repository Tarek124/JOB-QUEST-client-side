import { NavLink } from "react-router-dom";
import MyAnimation from "./Animation - 1714545452006.json";
import Lottie from "lottie-react";

export default function NotFoundPage() {
  return (
    <div className=" bg-white h-screen w-screen overflow-hidden">
      <div className="">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center min-h-screen justify-center">
          <div className="max-w-lg">
            <Lottie animationData={MyAnimation} />
          </div>
          <NavLink to="/" className="btn rounded-full my-2 ">
            Back Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

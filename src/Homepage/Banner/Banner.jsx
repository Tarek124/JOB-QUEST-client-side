import "animate.css";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import myAnimation from "./Animation - 1715494485869.json";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="overflow-hidden xl:flex-row flex flex-col justify-center  items-center gap-4 xl:gap-16 p-6 xl:p-32 text-white bg-gradient-to-r from-sky-700 to-indigo-400">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="xl:w-1/2 w-full"
      >
        <h1 className="text-5xl md:text-6xl mt-4 font-bold">
          Welcome to JOBQUEST
        </h1>
        <p className="text-4xl font-bold mt-3">Find your dream job today!</p>
        <p className="mt-2 text-slate-200">
          Looking for your dream job? Look no further! JOBQUEST is your ultimate
          destination for finding the perfect job that matches your skills,
          interests, and career aspirations. With JOBQUEST, you can explore a
          vast array of job opportunities from various industries and locations.
          Whether you are a seasoned professional or just starting your career
          journey, JOBQUEST has something for everyone !
        </p>
        <Link to="alljobs">
          <button className="bn632-hover bn26 shadow-lg mt-4">
            View All Job
          </button>
        </Link>
      </motion.div>
      <div className="xl:w-1/3 w-full animate__fadeInRight animate__animated py-4">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <Lottie animationData={myAnimation} />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Loading = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { myTheme } = useAuth();

  useEffect(() => {
    const animation = animate(count, 100, { duration: 10 });

    return animation.stop;
  }, []);
  return (
    <div
      className={`w-full h-[90vh] flex justify-center items-center ${
        myTheme == "dark" ? "bg-[#272727]" : ""
      }
    `}
    >
      <motion.h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-7xl text-center font-semibold font-sans">
        {rounded}
      </motion.h1>
    </div>
  );
};

export default Loading;

import "animate.css";

const Banner = () => {
  return (
    <div className="flex justify-center h-[90vh] items-center gap-16 p-32 text-white bg-gradient-to-r from-sky-700 to-indigo-400">
      <div className="w-1/2">
        <h1 className="text-6xl font-bold">Welcome to JOBQUEST</h1>
        <p className="text-4xl font-bold mt-3">Find your dream job today!</p>
        <p className="mt-2 text-slate-200">
          Looking for your dream job? Look no further! JOBQUEST is your ultimate
          destination for finding the perfect job that matches your skills,
          interests, and career aspirations. With JOBQUEST, you can explore a
          vast array of job opportunities from various industries and locations.
          Whether you are a seasoned professional or just starting your career
          journey, JOBQUEST has something for everyone !
        </p>
        <button className="bn632-hover bn26 shadow-lg mt-4">
          View All Job
        </button>
      </div>
      <div className="w-1/3 animate__fadeInRight animate__animated">
        <img
          src="https://seriesofrandomthoughts.files.wordpress.com/2021/05/how-to-get-a-dream-job-compressor.png"
          alt=""
          className="shadow rounded"
        />
      </div>
    </div>
  );
};

export default Banner;

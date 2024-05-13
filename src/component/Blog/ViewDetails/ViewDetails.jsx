import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "animate.css";

const ViewDetails = () => {
  const { id } = useParams();
  const { questions } = useAuth();
  const data = questions.find((x) => x.id == id);
  console.log(data);
  return (
    <div className="lg:py-20 px-4 py-6 lg:px-32 bg-[#1969b9]">
      <div className="animate__animated animate__fadeIn">
        <h1 className="text-3xl font-semibold lg:w-3/4 text-slate-100 ">
          {data?.question}
        </h1>
        <p className="font-normal text-[#f3f3f3] mt-2">{data?.description}</p>
        <div>
          {data?.keyPoints?.map((item, inx) => (
            <div key={inx}>
              <h2 className="mt-6  mb-1 font-semibold text-xl text-slate-100 ">
                {item?.title?.toUpperCase()}
              </h2>
              <p className="md:pr-32 lg:w-1/2 text-slate-200">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

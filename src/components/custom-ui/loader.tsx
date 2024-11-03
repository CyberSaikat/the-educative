import { LoaderContext } from "@/context/loaderContext";
import React, { useContext } from "react";

const Loader = () => {
  const { loader } = useContext(LoaderContext);

  if (!loader) return null;

  return (
    <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen z-[99999999999999999] flex justify-center items-center text-[#45d6b5] cursor-wait">
      <div className="cssload-preloader">
        <div className="cssload-preloader-box">
          <div>L</div>
          <div>o</div>
          <div>a</div>
          <div>d</div>
          <div>i</div>
          <div>n</div>
          <div>g</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

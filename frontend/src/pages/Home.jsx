import React from "react";
import ScrollableItems from "../components/ScrollableItems";
import Circle from "../components/Circle";
import Landing from "../components/Landing";

const Home = () => {
  return (
    <div className="bg-pink-200 mt-3 pb-3 sm:pb-5">

      <div className="mt-6 sm:mt-0 shadow-lg">
        <Landing />
        <hr/>
      </div>


      <div className="my-1 sm:my-8 shadow-lg ">
        <div className="p-4 sm:p-5 shadow-[4px_4px_10px_rgba(0,0,0,0.3)]">

        <h1 className="pb-3 text-2xl sm:text-4xl text-start">
          Health Issues in Women Your Age
        </h1>
        <ScrollableItems />
        {/* <hr/> */}
        </div>
      </div>

        {/* <hr/> */}
      <div className="shadow-lg">
        <div className="p-4 sm:p-5 shadow-[4px_4px_10px_rgba(0,0,0,0.3)]">

        {/* <h1 className="pb-3 text-2xl sm:text-4xl text-center">Hellow hellow test</h1> */}
        <Circle />
        </div>
      </div>
      
    </div>
  );
};

export default Home;

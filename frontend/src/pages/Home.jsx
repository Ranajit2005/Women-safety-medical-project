import React from "react";
import ScrollableItems from "../components/ScrollableItems";
import Circle from "../components/Circle";
import Landing from "../components/Landing";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import ArticlePage from "./ArticlePage";
import SomeArticle from "./SomeArticle";

const Home = () => {
  return (
    <div className="bg-pink-200 mt-3 pb-3 sm:pb-5">

        <Navbar/>

        {/* 1st section */}
      <div className="mt-6 sm:mt-0 shadow-lg">
        <Landing />
        <hr />
      </div>

        {/* 2nd section */}
      <div className="shadow-lg my-3 sm:my-5 ">
        <div className="shadow-[4px_4px_10px_rgba(0,0,0,0.3)] ">
          <h1 className="py-3 text-2xl sm:text-4xl text-center">
            Health Issues in Women's Body
          </h1>
          <Card />
        </div>
      </div>


        {/* 3rd section */}
      <div className="shadow-lg my-6 sm:my-10 ">
        <div className="p-4 sm:p-5 shadow-[4px_4px_10px_rgba(0,0,0,0.3)]">
          {/* <h1 className="pb-3 text-2xl sm:text-4xl text-center">Hellow hellow test</h1> */}
          <Circle />
        </div>
      </div>

        {/* 4th section */}
        <div className="shadow-lg p-3">
            <div className="shadow-[4px_4px_10px_rgba(0,0,0,0.3)] ">
                <h1 className="py-3 text-2xl sm:text-4xl text-center">
                    Myths and Facts
                </h1>
                <ScrollableItems />
            </div>
        </div>

        {/* 5th section */}
        <div className="shadow-lg p-3">
            <div className="shadow-[4px_4px_10px_rgba(0,0,0,0.3)] ">
                <SomeArticle/>
            </div>
        </div>


        <Footer/>
    </div>
  );
};

export default Home;

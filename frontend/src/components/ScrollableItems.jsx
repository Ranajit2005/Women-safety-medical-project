import React, { useEffect, useRef, useState } from "react";

const AutoScrollBox = () => {
  const boxRef = useRef(null);
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const box = boxRef.current;

    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth); // Width + margin  
    }

    const scrollBox = () => {
      if (box) {
        box.scrollBy({ left: itemWidth, behavior: "smooth" });
        if (box.scrollLeft + box.clientWidth >= box.scrollWidth) {
          box.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(scrollBox, 5000);
    return () => clearInterval(interval);
  }, [itemWidth]);

  // Fixed width for all items (adjust as needed)
  const itemStyle = "w-[270px] sm:w-[450px]"; 

  return (
    <div
      ref={boxRef}
      className="flex overflow-x-auto my-1 sm:my-3 rounded-lg w-full scrollbar-hide"
    >
      <div className="flex space-x-4">

        {/* Item 1 (with measurement ref) */}
        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>




        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>






        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>





        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>






        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>





        <div
          ref={itemRef}
          className={`bg-purple-500 grid grid-cols-1 sm:grid-cols-2 text-white rounded-lg h-72 overflow-auto ${itemStyle} shadow-lg`}
        >
          
          <div className="flex flex-col pl-1 pt-3 sm:pl-5">
            <h1 className="text-2xl sm:text-3xl">abc</h1>
            <p className="text-justify pr-5 pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>

        

        

        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default AutoScrollBox;
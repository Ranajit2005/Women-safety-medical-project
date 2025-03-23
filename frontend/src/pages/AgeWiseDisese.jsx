import React, { useEffect, useRef, useState } from "react";

const AutoScrollBox = () => {
  const boxRef = useRef(null); // Ref to the scrollable box
  const itemRef = useRef(null); // Ref to the first item to measure its width
  const [itemWidth, setItemWidth] = useState(0); // State to store the width of an item

  useEffect(() => {
    const box = boxRef.current;

    // Measure the width of the first item
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }

    // Function to scroll the box
    const scrollBox = () => {
      if (box) {
        // Scroll by the full width of an item
        box.scrollBy({ left: itemWidth, behavior: "smooth" });

        // If scrolled to the end, reset to the start
        if (box.scrollLeft + box.clientWidth >= box.scrollWidth) {
          box.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    };

    // Set an interval to scroll every 3 seconds
    const interval = setInterval(scrollBox, 3000000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [itemWidth]); // Re-run effect if itemWidth changes

  return (
    <div
      ref={boxRef}
      className="flex overflow-x-auto p-4 bg-gray-200 rounded-lg w-full scrollbar-hide" // Full width and hide scrollbar
    >
      {/* Content inside the box */}
      <div className="flex space-x-4">
        {/* Fixed-size boxes with text wrapping */}
        <div
          ref={itemRef} // Ref to measure the width of this item
          className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto"
        >
          <h1>abc</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto">
          <h1>Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto">
          <h1>Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto">
          <h1>Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto">
          <h1>Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg w-screen h-72 overflow-auto">
          <h1>Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo! Velit repellendus hic commodi eos aliquid accusantium exercitationem obcaecati fuga, perspiciatis non itaque, voluptatum quam eum et aut vel esse deleniti sit, ipsam rerum a recusandae ratione inventore soluta. Nulla totam id dolorem iste nihil corrupti quis in quas. Consequuntur, accusantium, distinctio error sit mollitia tempore placeat quis eligendi, repellat quasi atque eum. Excepturi dicta vel est blanditiis debitis error, nihil iste iure harum exercitationem tempore sunt repellat reprehenderit, eos, modi maiores dolores eveniet quis temporibus? Nulla fugiat atque facere autem quos voluptatum, veniam molestias rerum molestiae, repudiandae minima tenetur!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoScrollBox;
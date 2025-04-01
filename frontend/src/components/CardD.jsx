import React from 'react';

const CardD = ({ imageUrl, title, content, hoverContent }) => {
  return (
    <div className="group relative w-full flex bg-pink-300 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Card Image */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-1/3 h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Main Content (always visible) */}
      <div className="p-4 w-2/3">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
      
      {/* Hover Content (hidden by default) */}
      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
        {/* <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4">{content}</p> */}
        <div className="">
          <p className="text-sm">{hoverContent}</p>
        </div>
        {/* <button className="mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200 self-start">
          Learn More
        </button> */}
      </div>
    </div>
  );
};

export default CardD;
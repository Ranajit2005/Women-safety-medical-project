import React from 'react';

const CardD = ({ imageUrl, title, content, hoverContent }) => {
  return (
    <div className="h-auto md:h-56 group relative w-full flex flex-col md:flex-row bg-pink-300 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Card Image - Always Visible */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full md:w-1/3 h-48 object-cover md:my-auto md:ml-3 md:mr-1 rounded-lg"
      />
      
      {/* Main Content - Always Visible */}
      <div className="p-4 w-full md:w-2/3">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
      
      {/* Hover Content - Hidden on mobile, shows on hover (desktop) */}
      <div className="hidden md:absolute md:inset-0 bg-black bg-opacity-70 md:flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
        <div className="overflow-y-auto">
          <p className="text-sm whitespace-pre-line">{hoverContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CardD;
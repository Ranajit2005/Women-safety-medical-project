
const CircleCard = ({ imageSrc, title, hoverText,link }) => {
    return (
      <div className="relative w-40 text-center cursor-pointer group ">
        {/* Circle with Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto transition-transform duration-300 group-hover:scale-110">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover " />
        </div>
  
        {/* Title */}
        <div className="font-bold mt-2 text-gray-700">{title}</div>
  
        {/* Hover Text */}
        <div className="absolute top-24 left-0 right-0 hidden group-hover:block bg-pink-100 p-2 rounded shadow-md text-sm text-gray-600 transition-opacity duration-300 z-10">
          {hoverText}
          <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-semibold hover:underline inline-block"
        >
          More info &rarr;
        </a>
        </div>
      </div>
    );
  };
  
  export default CircleCard;
  
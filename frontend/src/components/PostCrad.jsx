import React from "react";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const PostCard = ({
  doctorName,
  title,
  content,
  image,
  date,
  userId,
}) => {
  console.log("Userid is : ", userId);
  const { authUser } = useAuthStore();
  console.log("authUser:", authUser._id);

  const onDelete = async () => {
    console.log("Delete button clicked");
  }

  return (
    <div className="m-3 p-3 sm:m-5 sm:p-5 flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden mb-5 bg-pink-300 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Image section */}
      {image && (
        <div className="w-full sm:w-1/3 h-48 sm:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Content section */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-2">By Dr. {doctorName}</p>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{content}</p>
      </div>

      {/* Delete button */}

      {authUser._id === userId && (
        <button
          onClick={onDelete}
          className="absolute bottom-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors"
          aria-label="Delete post"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PostCard;

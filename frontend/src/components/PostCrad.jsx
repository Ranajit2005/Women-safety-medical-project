import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  doctorName,
  title,
  content,
  image,
  date,
  userId,
  postId,
  publicId
}) => {
  const { authUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDelete = async () => {
    console.log("Delete button clicked");
    console.log("Post Id", postId, "Public Id", publicId);

    try {
      setLoading(true);
      const { data } = await axiosInstance.delete("/article/delete", {
        data: {
          postId,
          publicId
        }
      });

      console.log("Post deleted successfully:", data);
      navigate(0);
      setLoading(false);
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-30 z-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-600" />
          </div>
        </div>
      )}

      <div className="mt-10 m-3 p-3 sm:m-5 sm:p-5 flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden mb-5 bg-pink-300 transition-shadow relative shadow-[4px_4px_10px_rgba(0,0,0,0.3)]">
        {/* Image section */}
        {image && (
          <div className="w-full sm:w-1/3 h-48 sm:h-auto">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.3)]"
            />
          </div>
        )}

        {/* Content section */}
        <div className="w-full sm:w-2/3 p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-semibold text-gray-800 line-clamp-2">
              {title}
            </h3>
            <span className="absolute top-5 right-5 text-xs text-black whitespace-nowrap ml-2">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <p className="text-lg font-bold text-gray-600 mb-2">By Dr. {doctorName}</p>

          {/* Scrollable content with styled scrollbar */}
          <div className="text-gray-700 text-sm mb-4 pr-2 overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-pink-200 hover:scrollbar-thumb-pink-600">
            {content}
          </div>
        </div>

        {/* Delete button */}
        {authUser._id === userId && (
          <button
            onClick={onDelete}
            className="absolute bottom-2 right-2 p-2 text-black hover:text-red-700 transition-colors"
            aria-label="Delete post"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Add this style tag for custom scrollbar in older browsers */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fbcfe8; /* pink-200 */
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #ec4899; /* pink-500 */
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #db2777; /* pink-600 */
        }
      `}</style>
    </>
  );
};

export default PostCard;
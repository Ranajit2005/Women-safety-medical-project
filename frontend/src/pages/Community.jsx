import React, { useEffect, useState } from "react";
import { socket } from "../lib/socket.js";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "../store/useAuthStore.js";
import Navbar from "../components/Navbar.jsx";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { authUser } = useAuthStore();
  const currentUser = authUser?.fullName || "Anonymous User";
  //const currentUserId = authUser?._id || null;

  useEffect(() => {
    fetchPosts();

    socket.on("new_post", (post) => {
      setPosts((prev) => [post, ...prev]);
    });

    socket.on("new_comment", ({ postId, comment }) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
              ...p,
              comments: [...(p.comments || []), comment],
            }
            : p
        )
      );
    });

    socket.on("delete_post", (postId) => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    });

    socket.on("delete_comment", ({ postId, commentId }) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
              ...p,
              comments: p.comments.filter((c) => c.id !== commentId),
            }
            : p
        )
      );
    });

    return () => {
      socket.off("new_post");
      socket.off("new_comment");
      socket.off("delete_post");
      socket.off("delete_comment");
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async () => {
    if (!newPost.trim()) return;
    setLoading(true);
    try {
      await axiosInstance.post("/posts", {
        user: currentUser,
        content: newPost,
      });
      setNewPost("");
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async (postId, comment) => {
    if (!comment.trim()) return;
    try {
      await axiosInstance.post(`/posts/${postId}/comment`, {
        user: currentUser,
        text: comment,
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const deletePost = async (postId) => {
    // if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      socket.emit("delete_post", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleting(false);
    }
  };

  const deleteComment = async (postId, commentId) => {
    // if (!window.confirm("Are you sure you want to delete this comment?"))
    //   return;
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      socket.emit("delete_comment", { postId, commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const getUserInitial = (user) => {
    if (!user || user === "Anonymous User") return "A";
    const firstName = user.split(" ")[0];
    return firstName.charAt(0).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "";
    }
  };

  const isCurrentUser = (user) => {
    return user === currentUser;
  };

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('/bg/bg3.jpg')` }}
      ></div>

      <Navbar />

      <div className="relative z-10 p-4 max-w-2xl mx-auto mt-20">
        <div className="bg-pink-200/5 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-black border-b border-pink-200 pb-2">
            Community Support Forum
          </h2>

          {/* New Post Section */}
          <div className="mb-8 bg-pink-500/5 bg-opacity-70 p-4 rounded-lg border border-pink-100">
            <h3 className="text-lg font-semibold text-black mb-3">
              Share your thoughts or ask a question
            </h3>
            <textarea
              className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white bg-opacity-50"
              rows="4"
              placeholder="Share your experience, ask for advice, or offer support..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={submitPost}
                className="px-5 py-2 bg-pink-600 hover:bg-black text-white rounded-lg transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse text-pink-700">
                  Loading community posts...
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-pink-700">
                No posts yet. Be the first to share!
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-pink-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative bg-pink-100 bg-opacity-70"
                >
                  {/* Post Delete Button (only shows for current user's posts) */}
                  {isCurrentUser(post.user) && (
                    <button
                      onClick={() => deletePost(post.id)}
                      className="absolute top-2 right-2 text-pink-400 hover:text-pink-700"
                      disabled={deleting}
                      title="Delete post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-semibold mr-3">
                      {getUserInitial(post.user)}
                    </div>
                    <div>
                      <div className="font-semibold text-black">
                        {post.user || "Anonymous User"}
                      </div>
                      <div className="text-xs text-pink-500">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 text-gray-900 pl-11">{post.content}</div>

                  {/* Comments Section */}
                  <div className="ml-11 border-t border-pink-100 pt-3">
                    <h4 className="text-sm font-medium text-pink-600 mb-2">
                      Replies ({(post.comments || []).length})
                    </h4>

                    {(post.comments || []).map((comment) => (
                      <div
                        key={comment.id}
                        className="mb-2 pl-3 border-l-2 border-pink-100 relative group"
                      >
                        {/* Comment Delete Button (only shows for current user's comments) */}
                        {isCurrentUser(comment.user) && (
                          <button
                            onClick={() => deleteComment(post.id, comment.id)}
                            className="absolute top-0 right-0 text-pink-300 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete comment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}

                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-pink-700">
                            {comment.user || "Anonymous User"}:
                          </span>
                          <span className="text-xs text-pink-500 ml-2">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          {comment.text}
                        </div>
                      </div>
                    ))}

                    <div className="mt-3 flex">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        className="flex-1 border border-pink-200 rounded-l-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white bg-opacity-50"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            submitComment(post.id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousElementSibling;
                          if (input.value.trim()) {
                            submitComment(post.id, input.value);
                            input.value = "";
                          }
                        }}
                        className="px-3 py-2 bg-pink-100 text-pink-600 rounded-r-lg hover:bg-pink-200 transition-colors text-sm"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
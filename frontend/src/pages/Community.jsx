import React, { useEffect, useState } from "react";
import { socket } from "../lib/socket.js";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [loading, setLoading] = useState(true);

    const { authUser } = useAuthStore();
    const currentUser = authUser?.fullName ;

    console.log("Current User:", currentUser);

    useEffect(() => {
        axiosInstance.get("/posts")
            .then(res => {
                setPosts(res.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });

        socket.on("new_post", post => {
            setPosts(prev => [post, ...prev]);
        });

        socket.on("new_comment", ({ postId, comment }) => {
            setPosts(prev =>
                prev.map(p => p.id === postId ? { 
                    ...p, 
                    comments: [...(p.comments || []), comment] 
                } : p)
            );
        });

        return () => {
            socket.off("new_post");
            socket.off("new_comment");
        };
    }, []);

    const submitPost = async () => {
        if (!newPost.trim()) return;
        try {
            await axiosInstance.post("/posts", {
                user: currentUser,
                content: newPost
            });
            setNewPost("");
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const submitComment = async (postId, comment) => {
        if (!comment.trim()) return;
        try {
            await axiosInstance.post(`/posts/${postId}/comment`, {
                user: currentUser,
                text: comment
            });
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const getUserInitial = (user) => {
        if (!user || user === "Anonymous User") return "A";
        const firstName = user.split(" ")[0]; // Get first name
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

    return (
        <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-purple-800 border-b pb-2">Community Support Forum</h2>

            {/* New Post Section */}
            <div className="mb-8 bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">Share your thoughts or ask a question</h3>
                <textarea
                    className="w-full border border-purple-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    rows="4"
                    placeholder="Share your experience, ask for advice, or offer support..."
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                    <button
                        onClick={submitPost}
                        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
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
                        <div className="animate-pulse text-gray-500">Loading community posts...</div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No posts yet. Be the first to share!
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-3">
                                    {getUserInitial(post.user)}
                                </div>
                                <div>
                                    <div className="font-semibold text-purple-800">{post.user || "Anonymous User"}</div>
                                    <div className="text-xs text-gray-500">{formatDate(post.createdAt)}</div>
                                </div>
                            </div>
                            <div className="mb-4 text-gray-700 pl-11">{post.content}</div>

                            {/* Comments Section */}
                            <div className="ml-11 border-t pt-3">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">
                                    Replies ({(post.comments || []).length})
                                </h4>
                                
                                {(post.comments || []).map((c, i) => (
                                    <div key={i} className="mb-2 pl-3 border-l-2 border-purple-100">
                                        <div className="flex items-center">
                                            <span className="text-sm font-semibold text-purple-700">{c.user || "Anonymous User"}:</span>
                                            <span className="text-xs text-gray-500 ml-2">{formatDate(c.createdAt)}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">{c.text}</div>
                                    </div>
                                ))}

                                <div className="mt-3 flex">
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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
                                        className="px-3 py-2 bg-purple-50 text-purple-600 rounded-r-lg hover:bg-purple-100 transition-colors text-sm"
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
    );
}
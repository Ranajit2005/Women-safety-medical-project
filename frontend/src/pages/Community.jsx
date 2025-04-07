import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../lib/socket.js";
import { axiosInstance } from "../lib/axios.js";

export default function Community({ currentUser }) {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        axiosInstance.get("/posts").then(res => setPosts(res.data));

        socket.on("new_post", post => {
            setPosts(prev => [post, ...prev]);
        });

        socket.on("new_comment", ({ postId, comment }) => {
            setPosts(prev =>
                prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)
            );
        });

        return () => {
            socket.off("new_post");
            socket.off("new_comment");
        };
    }, []);

    const submitPost = async () => {
        if (!newPost.trim()) return;
        await axiosInstance.post("/posts", {
            user: currentUser,
            content: newPost
        });
        setNewPost("");
    };

    const submitComment = async (postId, comment) => {
        if (!comment.trim()) return;
        await axiosInstance.post(`/posts/${postId}/comment`, {
            user: currentUser,
            text: comment
        });
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Community & Blog</h2>

            <div className="mb-6">
                <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    placeholder="Ask something..."
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                />
                <button
                    onClick={submitPost}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                >
                    Post
                </button>
            </div>

            {posts.map(post => (
                <div key={post.id} className="border rounded p-3 mb-4">
                    <div className="font-semibold">{post.user}</div>
                    <div className="mb-2">{post.content}</div>

                    <div className="ml-4 text-sm">
                        {post.comments.map((c, i) => (
                            <div key={i}><strong>{c.user}:</strong> {c.text}</div>
                        ))}

                        <input
                            type="text"
                            placeholder="Reply..."
                            className="border rounded px-2 py-1 mt-2 w-full"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submitComment(post.id, e.target.value);
                                    e.target.value = "";
                                }
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

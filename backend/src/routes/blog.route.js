import express from 'express';
import { Post } from '../models/post.model.js';

const router = express.Router();

// Utility to transform Mongoose doc to plain object with `id`
const normalizePost = (post) => {
    const obj = post.toObject({ virtuals: true });
    obj.id = obj._id;
    delete obj._id;
    obj.comments = obj.comments.map(c => ({
        ...c,
        id: c._id,
        _id: undefined,
    }));
    return obj;
};

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        const normalized = posts.map(normalizePost);
        res.json(normalized);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Create a post
router.post("/", async (req, res) => {
    try {
        const { user, content } = req.body;

        const newPost = new Post({ user, content, comments: [] });
        const savedPost = await newPost.save();
        const normalized = normalizePost(savedPost);

        const io = req.app.get("io");
        io.emit('new_post', normalized);

        res.status(201).json(normalized);
    } catch (err) {
        console.error("Error in /api/posts:", err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Add a comment
router.post("/:id/comment", async (req, res) => {
    try {
        const { user, text } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const comment = { user, text };
        post.comments.push(comment);
        await post.save();

        const newComment = post.comments[post.comments.length - 1];
        const io = req.app.get("io");
        io.emit('new_comment', {
            postId: post._id.toString(),
            comment: {
                ...newComment.toObject(),
                id: newComment._id.toString(),
            }
        });

        res.status(201).json({
            ...newComment.toObject(),
            id: newComment._id.toString(),
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const io = req.app.get("io");
        io.emit("delete_post", req.params.id);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete post" });
    }
});

// Delete a comment
router.delete("/:id/comments/:commentId", async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
        await post.save();

        const io = req.app.get("io");
        io.emit("delete_comment", { postId: id, commentId });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

export default router;

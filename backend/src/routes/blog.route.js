import express from 'express';
import { Post, Comment } from '../models/post.model.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('comments.user');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


router.post("/", async (req, res) => {
    try {
        const { user, content } = req.body;

        const newPost = new Post({
            user,
            content,
            comments: [],
        });

        const savedPost = await newPost.save();
        const populatedPost = await savedPost.populate('user');

        io.emit('new_post', populatedPost); // Make sure `io` is accessible

        res.status(201).json(populatedPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});


router.post("/:id/comment", async (req, res) => {
    try {
        const { user, text } = req.body;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const newComment = { user, text };
        post.comments.push(newComment);
        await post.save();

        io.emit('new_comment', { postId: post._id, comment: newComment });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});


export default router;
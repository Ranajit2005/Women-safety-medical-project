import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [commentSchema], // Embedded array of comments
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
//const Comment = mongoose.model('Comment', commentSchema);

export { Post };

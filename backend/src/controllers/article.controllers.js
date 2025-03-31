import { connectDB } from '../lib/dbConnection.js';
import Article from '../models/article.model.js';
import { v2 as cloudinary } from 'cloudinary';

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        return res.status(200).json({
            message: "Articles fetched successfully",
            success: true,
            articles
        });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong in fetching articles",
            success: false
        });
    }
}


const addArticle = async (req, res) => {

    try {
        const { title, content, userId, doctorName, image, public_id } = req.body;

        await Article.create({
            title,
            content,
            userId,
            doctorName,
            image,
            public_id
        });

        return res.status(200).json({
            message: "Article added successfully",
            success: true,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong in adding article",
            success: false
        });
    }
}

const deleteArticle = async (req, res) => {

    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {

        await connectDB();

        const { postId, publicId } = await req.body;

        console.log("Post Id", postId, "Public Id", publicId);

        if(publicId!="") await cloudinary.uploader.destroy(publicId);

        const article = await Article.findByIdAndDelete(postId);

        if (!article) {
            return res.status(404).json({
                message: "Article not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Article deleted successfully",
            success: true,
        });

    } catch (error) {

        console.error("Cloudinary Deletion Error:", error);

        return res.status(400).json({
            message: "Something went wrong in deleting article",
            success: false
        });
    }
}


export { getAllArticles, addArticle, deleteArticle };

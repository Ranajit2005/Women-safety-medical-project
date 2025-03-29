import Article from '../models/article.model.js';

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

        const article = await Article.create({
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


export { getAllArticles, addArticle };
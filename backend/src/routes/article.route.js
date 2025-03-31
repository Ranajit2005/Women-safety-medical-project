import express from 'express';
import { getAllArticles, addArticle,deleteArticle } from '../controllers/article.controllers.js';


const router = express.Router();

router.get('/fetch', getAllArticles);
router.post('/add', addArticle);
router.delete('/delete',deleteArticle);

export default router;
import express from 'express';
import { getAllArticles, addArticle } from '../controllers/article.controllers.js';


const router = express.Router();

router.get('/fetch', getAllArticles);
router.post('/add', addArticle);

export default router;
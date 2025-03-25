import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { signup, login, logout, checkAuth, updateProfile } from '../controllers/auth.controllers.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/updateProfile', updateProfile);
router.get('/check', protectRoute, checkAuth);


export default router;
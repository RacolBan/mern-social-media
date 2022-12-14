import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/post.js';
import upload from '../middleware/uploadPicture.js';
const router = Router();

router.post('/', verifyToken, upload.single('picture'), createPost);
router.get('/', getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;
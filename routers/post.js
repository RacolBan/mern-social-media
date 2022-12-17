import { Router } from 'express';
import upload from '../service/uploadPicture.js';
import verifyToken from '../middleware/verifyToken.js';
import { createPost, getFeedPosts, getUserPosts, likePost }  from '../controllers/post.js';
const router = Router();

router.post('/', verifyToken, upload.single('picture'), createPost);
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;
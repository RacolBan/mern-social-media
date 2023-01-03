import { Router } from 'express';
import {
  addRemoveFriend,
  getUser,
  getUserFriends
} from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';
const router = Router();

router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);
export default router;

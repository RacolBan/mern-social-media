import { register, login } from '../controllers/auth.js'
import { Router } from  'express';
import upload from '../middleware/uploadPicture.js';
const router = Router();
router.post('/register', upload.single("picture"), register)
router.post('/login', login)

export default router;
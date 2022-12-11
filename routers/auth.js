import { register, login } from '../controllers/auth.js'
import upload from '../service/uploadPicture.js'
import { Router } from  'express';
const router = Router();
router.post('/register', upload.single('picture'), register)
router.post('/login', login)

export default router;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';
import postRouter from './routers/post.js';
import User from './models/User.js';
import Post from './models/Post.js';
import {posts, users} from './data/data.js'

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet({
  crossOriginResourcePolicy: {policy: 'cross-origin'}
}));
app.use(morgan('common'));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'pulic/assets')));
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
const port = process.env.PORT || 5000; 
const urlMongo = process.env.MONGO_URL;
mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // Add Data one Time
  // User.insertMany(users);
  // Post.insertMany(posts);
  app.listen(port, () => console.log(`server on ${port}... `))
}).catch(error => {
  console.error(`${error} did not connect`)
})



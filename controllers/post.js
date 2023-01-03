import Post from '../models/Post.js';
import User from '../models/User.js';
const createPost = async (req, res) => {
 try {
  const { userId, picturePath, description } = req.body;
  const user = await User.findById(userId);
  const newPost = new Post({
    firstName: user.firstName,
    lastName: user.lastName,
    userId,
    picturePath,
    location: user.location,
    description,
    userPicturePath: user.picturePath,
    likes: {},
    comments: []
  });
  await newPost.save();
  const post = await Post.find();
  console.log(post);
  res.status(201).json(post);
 } catch(error) {
  res.status(409).json({ msg: error.message });
 }
};
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch(error) {
    res.status(404).json({ msg: error.message })
  }
};
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
    res.status(200).json(posts);
  } catch(error) {
    res.status(404).json({ msg: error.message})
  }
};
// Update
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLike = post.likes.get(userId);
    isLike ? post.likes.delete(userId) : post.likes.set(userId, true)
    const updatePost= await Post.findByIdAndUpdate(
      id, 
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatePost);
  } catch (error) {
    res.status(404).json({ msg: error.message})
  }
};

export { createPost, getFeedPosts, getUserPosts, likePost }
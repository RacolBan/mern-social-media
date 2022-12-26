import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const register = async (req, res) => {
  try {
    const file = req.file;
    console.log(req.file)
    if (!file) {
      return res.status(400).json('please provider an avatar');
    };
    const {
      firstName, 
      lastName, 
      email,
      password,
      location,
      occupation,
      friends,
      picturePath
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName, 
      lastName, 
      email,
      password: hashPass,
      location,
      occupation,
      friends,
      picturePath,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    })
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
};
  
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(email);
    const user = await User.findOne({email: email});
    if (!user) return res.status(400).json({msg: 'User does not exist.'});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: 'invalid password'});
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
}
export { register, login };
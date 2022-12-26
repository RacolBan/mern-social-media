import User from '../models/User.js';
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch(error) {
    res.status(404).json({ mgs: error.message });
  }
};
const getUserFriends = async (req,res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(user.friends.map(id => User.findById(id)));
    const formatFriends = friends.map(({ _id, firstName, lastName, email, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, email, occupation, location, picturePath };
    })
    res.status(200).json(formatFriends);
  } catch(error) {
    res.status(404).json({ msg: error.message })
  }
};
// UPDATE
const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;
  const user = await User.findById(id);
  const friend = await User.findById(friendId);
  // Handle remove a friend from list friends
  if(user.friends.includes(friendId)) {
    user.friends = user.friends.filter( id => id !== friendId)
    friend.friends = friend.friends.filter( id => id !== id)
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  };
  await user.save();
  await friend.save();
  const friends = await Promise.all(user.friends.map(id => User.findById(id)));
    const formatFriends = friends.map(({ _id, firstName, lastName, email, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, email, occupation, location, picturePath };
    })
    res.status(200).json(formatFriends);
}
export { getUser, getUserFriends, addRemoveFriend };
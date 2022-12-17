import mongoose, { Schema, model }  from 'mongoose';
mongoose.set('strictQuery', true);
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max:50
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max:50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  picturePath: {
    type: String,
    default: ''
  },
  friends: {
    type: Array,
   default: []
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number
},
{ timestamps: true }
);

const User = model('User', UserSchema);
export default User;
import { Schema, model, models } from 'mongoose';
const regExp = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email is already exist'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      regExp,
      'Username is invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', userSchema);

export default User;

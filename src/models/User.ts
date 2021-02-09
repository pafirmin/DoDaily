import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface UserDoc extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  date: Date;
}

export default mongoose.model<UserDoc>('user', UserSchema);

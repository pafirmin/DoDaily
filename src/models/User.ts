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
  folders: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'folder',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface UserDoc extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  folders: mongoose.Types.ObjectId[];
  date: Date;
}

export default mongoose.model<UserDoc>('user', UserSchema);

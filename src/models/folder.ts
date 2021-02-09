import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  name: {
    type: String,
    Required: true,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'task',
    },
  ],
  notes: [
    {
      type: String,
    },
  ],
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  users: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

interface FolderUser {
  user: mongoose.Types.ObjectId;
  isAdmin: Boolean;
}

interface Folder extends mongoose.Document {
  name: string;
  tasks: mongoose.Types.ObjectId[];
  notes: string[];
  users: FolderUser[];
}

export default mongoose.model<Folder>('folder', FolderSchema);

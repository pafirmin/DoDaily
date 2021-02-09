import mongoose from 'mongoose';
import { NoteDoc } from './Note';
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  name: {
    type: String,
    Required: true,
  },
  notes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'task',
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

export interface FolderUser {
  user: mongoose.Types.ObjectId;
  isAdmin: Boolean;
}

export interface FolderDoc extends mongoose.Document {
  creator: mongoose.Types.ObjectId;
  name: string;
  notes: NoteDoc[];
  users: FolderUser[];
}

export default mongoose.model<FolderDoc>('folder', FolderSchema);

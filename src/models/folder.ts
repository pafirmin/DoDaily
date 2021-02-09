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
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
});

export default mongoose.model('folder', FolderSchema);

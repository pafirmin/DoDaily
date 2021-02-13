import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  name: {
    type: String,
    Required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface FolderDoc extends mongoose.Document {
  creator: mongoose.Types.ObjectId;
  name: string;
  date: Date;
}

export default mongoose.model<FolderDoc>('folder', FolderSchema);

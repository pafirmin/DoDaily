import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  username: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface NoteDoc extends mongoose.Document {
  username: string;
  content: string;
  date: Date;
}

export default mongoose.model<NoteDoc>('note', NoteSchema);

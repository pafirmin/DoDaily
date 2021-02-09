import mongoose from 'mongoose';
import { NoteDoc } from './Note';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  folder: {
    type: mongoose.Types.ObjectId,
    ref: 'folder',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'LOW',
  },
  notes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'task',
    },
  ],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

export interface TaskDoc extends mongoose.Document {
  folder: mongoose.Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  notes: NoteDoc[];
  dateAdded: Date;
  dueDate: Date;
  complete: boolean;
}

export default mongoose.model<TaskDoc>('tasks', TaskSchema);

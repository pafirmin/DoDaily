import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
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
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
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

interface TaskNote {
  text: string;
  date?: Date;
}

export interface TaskDoc extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  folder: mongoose.Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  notes: TaskNote[];
  dateAdded: Date;
  dueDate: Date;
  complete: boolean;
}

export default mongoose.model<TaskDoc>('tasks', TaskSchema);

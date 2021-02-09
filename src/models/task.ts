import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
      type: String,
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

interface Task extends mongoose.Document {
  title: string;
  description: string;
  priority: string;
  notes: string[];
  dateAdded: Date;
  dueDate: Date;
  complete: boolean;
}

export default mongoose.model<Task>('tasks', TaskSchema);

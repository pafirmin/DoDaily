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
  complete: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('tasks', TaskSchema);

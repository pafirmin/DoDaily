import Folder from '../models/Folder';
import Task, { TaskDoc } from '../models/Task';
import { Request, Response } from 'express';
import { check, validationResult, Result } from 'express-validator';
import auth from '../middleware/auth';

// Make new task
const newTask = [
  auth,
  check('title').trim().isLength({ min: 1, max: 50 }),
  async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { title, description, priority, dueDate } = req.body;

      const task: TaskDoc = new Task({
        folder: req.params.id,
        title,
        description,
        priority,
        dueDate,
      });

      await task.save();

      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

// Delete a task
const deleteTask = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.id);
      const folder = await Folder.findById(task?.folder);

      if (!folder?.users.find(user => user === req.user.id)?.isAdmin) {
        return res
          .status(401)
          .json({ msg: 'You do not have permission to delete this item' });
      }

      return await folder.delete();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

// Toggle 'done' status
const markAsDone = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }

      task.complete = !task.complete;

      await task.save();

      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

export default { newTask, deleteTask, markAsDone };

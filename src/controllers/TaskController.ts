import Task, { TaskDoc } from '../models/Task';
import Folder from '../models/Folder';
import { Request, Response } from 'express';
import { check, validationResult, Result } from 'express-validator';
import auth from '../middleware/auth';

// Get all user's tasks
const getAll = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const tasks = Task.find({ user: req.user.id });

      return res.json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

// Make new task
const newTask = [
  auth,
  check('title', 'Tasks must have a title.')
    .trim()
    .isLength({ min: 1, max: 50 }),
  async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { title, description, priority, dueDate } = req.body;

      const folder = await Folder.findById(req.params.folderId);

      if (!folder) {
        return res.status(400);
      }
      if (folder.creator.toString() !== req.user.id) {
        return res.status(401);
      }

      const task: TaskDoc = new Task({
        user: req.user.id,
        folder: folder._id,
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

      if (!task) {
        return res.status(404).json({ msg: 'Specified task does not exist' });
      }

      if (task.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'You do not have permission to delete this item' });
      }

      return await task.delete();
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
      if (task.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json('You do not have permission to access this task');
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

// Add note to task
const addNote = [
  auth,
  check('noteText', 'Note cannot be empty').trim().not().isEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      if (task.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json('You do not have permission to add a note to this task');
      }

      task.notes.push({ text: req.body.noteText });

      await task.save();

      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

//Delete note from task
const deleteNote = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.taskID);

      if (!task) {
        return res.status(404);
      }

      if (task.user.toString() !== req.user.id) {
        return res.status(401);
      }

      task.notes = task.notes.filter(note => note._id !== req.params.noteID);

      await task.save();

      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];

const changePriority = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      if (task.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json('You do not have permission to modify this task');
      }

      task.priority = req.body.priority;

      await task.save();

      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: '500: Server error' });
    }
  },
];
export default {
  newTask,
  deleteTask,
  markAsDone,
  addNote,
  getAll,
  deleteNote,
  changePriority,
};

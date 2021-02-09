import { Request, Response } from 'express';
import { check, validationResult, Result } from 'express-validator';
import auth from '../middleware/auth';
import Folder, { FolderUser, FolderDoc } from '../models/Folder';
import User, { UserDoc } from '../models/User';
import Task, { TaskDoc } from '../models/Task';

// Get users folders
const getFolders = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const folders: FolderDoc[] = await Folder.find({
        users: { $elemMatch: { _id: req.params.id } },
      });

      return res.json(folders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

// Get tasks from folder
const getTasks = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const tasks: TaskDoc[] = await Task.find({ folder: req.params.id });

      return res.json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

// Make new folder
const newFolder = [
  auth,
  check('name', 'Please choose a name for your new folder')
    .trim()
    .not()
    .isEmpty(),
  async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const user: UserDoc | null = await User.findById(req.user.id).select(
        '-password'
      );

      if (!user) {
        throw new Error('Invalid user');
      }

      const name: string = req.body.name;

      let folder: FolderDoc | null = await Folder.findOne({ name: name });

      if (folder) {
        return res.status(400).json('Folder already exists by that name');
      }

      folder = new Folder({ name, creator: user });
      folder.creator = user._id;
      folder.users.push({ user: user._id, isAdmin: true });

      await folder.save();

      return res.json(folder);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

// Delete a folder
const deleteFolder = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const folder: FolderDoc | null = await Folder.findById(req.params.id);

      if (!folder) {
        return res.status(404).json({ msg: 'Folder not found' });
      }

      const user: FolderUser | undefined = folder.users.find(
        user => user === req.user.id
      );

      if (!user?.isAdmin) {
        return res.status(401).json({ msg: '401: Forbidden' });
      }

      return await folder.delete();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { newFolder, deleteFolder, getFolders, getTasks };

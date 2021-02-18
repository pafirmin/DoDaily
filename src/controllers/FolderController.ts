import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import Folder from '../models/Folder';
import User from '../models/User';
import Task from '../models/Task';

// Get user's folders
const getFolders = [
  auth,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user.id).populate('folders');

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const sortedFolders = user.folders.sort((a: any, b: any) =>
        b.isDefault - a.isDefault || a.name < b.name ? 1 : -1
      );

      return res.json(sortedFolders);
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
      const tasks = await Task.find({
        folder: req.params.id,
        user: req.user.id,
        dueDate: { $gt: new Date() },
      }).sort({ dueDate: 'ascending' });

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const name = req.body.name;

      let folder = await Folder.findOne({ name: name, creator: req.user.id });

      if (folder) {
        return res.status(400).json('Folder already exists by that name');
      }

      folder = new Folder({ name, creator: req.user.id });

      await folder.save();

      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { folders: folder._id } },
        { new: true }
      );

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
      const folder = await Folder.findById(req.params.id);

      if (!folder) {
        return res.status(404).json({ msg: 'Folder not found' });
      } else if (folder.isDefault) {
        return res
          .status(401)
          .json({ msg: 'Cannot delete your default folder' });
      } else if (folder.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: '401: Forbidden' });
      }

      await User.findByIdAndUpdate(req.user.id, {
        $pull: { folders: mongoose.Types.ObjectId(req.params.id) },
      });

      await folder.delete();

      await Task.deleteMany({ folder: folder._id });

      return res.json({ msg: 'Folder deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

// Rename a folder
const renameFolder = [
  auth,
  check('name', 'Folder name cannot be blank').trim().not().isEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }
    try {
      const folder = await Folder.findOneAndUpdate(
        { _id: req.params.id, creator: req.user.id },
        {
          name: req.body.name,
        }
      );

      res.json(folder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { newFolder, deleteFolder, getFolders, renameFolder, getTasks };

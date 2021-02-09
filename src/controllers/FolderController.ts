import { Request, Response } from 'express';
import Folder from '../models/folder';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';
import User from '../models/user';

// Make new folder
const newFolder = [
  auth,
  check('name', 'Please choose a name for your new folder')
    .trim()
    .not()
    .isEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const user: any = await User.findById(req.user._id);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const name = req.body.name;

      let folder = await Folder.findOne({ name: name });

      if (folder) {
        return res.status(400).json('Folder already exists by that name');
      }

      folder = new Folder({ name });
      folder.users.push(user);

      await folder.save();

      return res.json(folder);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];
export default { newFolder };

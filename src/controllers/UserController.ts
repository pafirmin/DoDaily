import User from '../models/User';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Folder, { FolderDoc } from '../models/Folder';

const newUser = [
  check('password', 'Password must be at least 6 characters').isLength({
    min: 6,
  }),
  check('email', 'Please provide a valid email address').isEmail(),
  check('username', 'Username must be between 4 and 15 characters')
    .trim()
    .isLength({
      min: 4,
      max: 15,
    }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, email, password, defaultFolderName } = req.body;

      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: 'Email already in use' });
      }

      user = new User({ username, email, password });

      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      user.password = hashedPassword;

      const folder: FolderDoc = new Folder({
        name: defaultFolderName,
        creator: user._id,
        isDefault: true,
      });

      user.folders.push(folder._id);

      await folder.save();
      await user.save();

      const payload = {
        user: {
          id: user._id,
          name: user.username,
        },
      };

      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) {
        throw 'JWT secret is undefined';
      }

      const accessToken: string = jwt.sign(payload, secret, {
        expiresIn: '15m',
      });

      const refreshToken: string = jwt.sign(payload, secret, {
        expiresIn: '7d',
      });

      return res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: false,
          secure: true,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        .json({ token: accessToken, username: user.username });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { newUser };

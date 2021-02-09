import User from '../models/user';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      const { username, email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'Email already in use' });
      }

      user = new User({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;

      await user.save();

      let userToken;
      const secret = process.env.JWT_SECRET;
      const payload = {
        user: {
          id: user._id,
        },
      };

      if (secret) {
        userToken = jwt.sign(payload, secret, { expiresIn: 300000 });
      } else {
        throw 'JWT secret is undefined';
      }

      return res.json(userToken);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { newUser };

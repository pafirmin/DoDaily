import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { check, validationResult } from 'express-validator';

const logIn = [
  check('email', 'Please provide a valid email address').isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ msg: 'No user found with that email address' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ msg: 'Invalid login details' });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw 'JWT secret is undefined';
      }

      let userToken: string = jwt.sign(payload, secret, {
        expiresIn: 300000,
      });

      return res.json(userToken);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { logIn };

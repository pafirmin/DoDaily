import User from '../models/user';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const newUser = [
  check('password', 'Password must be at least 6 characters').isLength({
    min: 6,
  }),
  check('email', 'Please provide a valid email address').isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'Email already in use' });
      }

      user = new User({ email, password });

      // await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

export default { newUser };

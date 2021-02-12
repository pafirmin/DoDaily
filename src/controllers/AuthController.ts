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
      return res.status(400).json(errors.array());
    }
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json()
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
        .json(accessToken);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
];

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['refreshToken'];
    if (!token) {
      return;
    }

    const secret: string | undefined = process.env.JWT_SECRET;
    if (!secret) {
      throw 'JWT secret is undefined';
    }

    const decoded: any = jwt.verify(token, secret);

    const payload = {
      user: decoded.user,
      expiresIn: '15m',
    };

    const accessToken: string = jwt.sign(payload, secret, {
      expiresIn: '15m',
    });

    return res.json(accessToken);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const logout = async (_req: Request, res: Response) => {
  try {
    return res
      .clearCookie('refreshToken', { sameSite: false, secure: true })
      .json();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
export default { logIn, refreshToken, logout };

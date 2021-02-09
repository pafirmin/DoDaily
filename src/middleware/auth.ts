import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const auth: RequestHandler = (req, res, next) => {
  try {
    let token: jwt.Secret;

    if (req.headers['authorization']) {
      const bearer = req.headers['authorization'].split(' ');
      token = bearer[1];

      if (!token) {
        throw new Error('Token not found');
      }
    } else {
      throw new Error('Authorization header not found');
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ msg: 'Server errpr' });
    }

    const decoded: any = jwt.verify(token, secret);

    req.user = decoded.user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ msg: '403: Unauthorized' });
  }
};

export default auth;

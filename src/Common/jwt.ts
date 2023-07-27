import { NextFunction, Request, Response } from 'express';
import config from './config';
import jwt = require('jsonwebtoken');
import userService from '../User/user.service';

class Token {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !(
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        )
      ) {
        throw { message: 'sem token', status: 403 };
      }

      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw { message: 'no token', status: 403 };

      const decoded = jwt.verify(token, config.jwt.secret);

      if (!(decoded && typeof decoded === 'object' && 'id' in decoded)) {
        return res.status(403).json({ error: 'invalid token' });
      }

      const user = await userService.getUserById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      req.user = user;
      return next();
    } catch (e) {
      return res.status(403).json({ error: 'invalid token' });
    }
  }
}

export default new Token();

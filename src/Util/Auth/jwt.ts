import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt = require('jsonwebtoken');
import userService from '../../User/user.service';

class Token {
    
    async authii(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, config.jwt.secret);

                if (decoded && typeof decoded === 'object' && 'id' in decoded) {
                    const user = await userService.getUserById(decoded.id);
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(404).json({ error: 'user not found' });
                    }
                } else {
                    res.status(403).json({ error: 'invalid token' });
                }
            } catch (e) {
                res.status(403).json({ error: 'invalid token' });
            }
        } else {
            res.status(403).json({ error: 'sem token' });
        }
    }
}

export default new Token();
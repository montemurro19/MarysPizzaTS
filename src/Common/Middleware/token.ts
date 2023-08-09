import jwt = require('jsonwebtoken');
import config from '../config';

export const generateToken = (id: string): string => {
    return jwt.sign(id, config.jwt, { expiresIn: '30d' });
};

export const authToken = (token: string): any => {
    return jwt.verify(token, config.jwt);
};

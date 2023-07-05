import { Request, Response } from 'express';
import config from './config';
import logging from './logging';

export const errorHandler = (err: Error, req: Request, res: Response) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    logging.error('SERVER', err.message, err);
    res.status(statusCode).json({
        message: err.message,
        stack: config.node.env === 'production' ? null : err.stack
    });
};

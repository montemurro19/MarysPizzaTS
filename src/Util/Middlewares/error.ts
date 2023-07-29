import { NextFunction, Request, Response } from 'express';

export default function errorhandle(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode ?? 500;
    res.status(statusCode).json({
        message: err.message,
        stack: err
    });
}

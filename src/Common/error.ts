import { Response } from 'express';

class ErrorMiddleware {
    handle(err: Error, res: Response) {
        const statusCode = res.statusCode ?? 500;
        res.status(statusCode).json({
            message: err.message,
            stack: err
        });
    }
}

export default new ErrorMiddleware();

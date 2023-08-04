import { NextFunction, Request, Response } from 'express';
import sendEmail from '../Mail/sendMail';

type ErrorName = 'conflict' | 'not_found' | 'unauthorized' | 'forbidden';

export interface IError {
    error: ErrorName;
    message?: string;
}

const errorCodes: { [key in ErrorName]: { code: number; defaultMessage: string } } = {
    conflict: { code: 409, defaultMessage: 'conflict' },
    not_found: { code: 404, defaultMessage: 'not found' },
    unauthorized: { code: 401, defaultMessage: 'unauthorized' },
    forbidden: { code: 403, defaultMessage: 'forbidden' }
};

export function errorResponse(err: IError, req: Request, res: Response, next: NextFunction) {
    const statusCode = errorCodes[err.error]?.code || 500;

    const errorMessage = err.message || errorCodes[err.error]?.defaultMessage || 'Internal Server Error';

    res.status(statusCode).json({
        message: errorMessage
    });
}

export async function errorMongoose(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === 'MongooseError') {
        await sendEmail('montemurro.matheus@gmail.com', 'banco de dados parou!', err.message);
    }
}

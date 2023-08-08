import { NextFunction, Request, Response } from 'express';
import Mongo from './mongo.connection';

const db = new Mongo();
const requestTimeout = 5000;

export const teste = async (req: Request, res: Response, next: NextFunction) => {
    const isConnected = db.isConnected();

    if (!isConnected) {
        try {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (!db.isConnected()) {
                        const errorMessage = 'request timeout';
                        const error = new Error(errorMessage);
                        reject(error);
                    } else {
                        resolve();
                    }
                }, requestTimeout);
            });
        } catch (error) {
            return next(error);
        }
    }

    return next();
};

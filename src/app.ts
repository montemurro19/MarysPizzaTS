import express, { NextFunction, Request, Response } from 'express';
import { item } from './routes/Item';
import logging from './config/logging';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(errorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info('SERVER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info('SERVER', `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});

//app.use(item);
app.use(item);

export { app };

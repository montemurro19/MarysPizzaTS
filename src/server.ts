import mongoose from 'mongoose';
import { app } from './app';
import config from './config/config';
import logging from './config/logging';

const start = async () => {
    mongoose
        .connect(config.mongo.url)
        .then((data) => {
            logging.info('DATABASE', `Connected at: ${data.connection.host}`);
            app.listen(config.server.port, () => {
                logging.info('SERVER', `Started at port: ${config.server.port}`);
            });
        })
        .catch((err) => logging.error('DATABASE', err.message, err));
};

start();

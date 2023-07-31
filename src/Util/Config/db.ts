import mongoose from 'mongoose';
import config from './config';
import logs from '../Middlewares/logs';

class Database {
    async connect() {
        logs.info('database', 'Connecting to MongoDB');
        mongoose
            .connect(config.mongo)
            .then(() => {
                logs.info('database', 'MongoDB is connected');
            })
            .catch(() => {
                logs.info('database', 'MongoDB connection unsuccessful');
            });
    }
}

export default new Database();

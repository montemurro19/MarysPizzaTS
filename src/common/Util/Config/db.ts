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
            .catch((e) => {
                logs.info('database', 'MongoDB connection unsuccessful', e);
            });
    }

    isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }
}

export default new Database();

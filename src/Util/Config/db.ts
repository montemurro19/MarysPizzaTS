import mongoose from 'mongoose';
import config from './config';
import logs from '../Middlewares/logs';

class Database {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false
    };

    async connect() {
        logs.info('database', 'Connecting to MongoDB(Retry when failed)');
        mongoose
            .connect(config.mongo)
            .then(() => {
                logs.info('database', 'MongoDB is connected');
            })
            .catch(() => {
                const retrySeconds = 5;
                logs.info('database', `MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`);
            });
    }
}

export default new Database();

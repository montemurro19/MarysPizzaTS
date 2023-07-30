import mongoose from 'mongoose';
import config from './config';
import logs from '../Middlewares/logs';

class Database {
    async connect() {
        try {
            await mongoose.connect(config.mongo);
            logs.info('database', 'mongo is connected');
        } catch (e) {
            logs.error('database', 'mongo isnt connected');
        }
    }
}

export default new Database();

/* import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';

const log: IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false
    };

    constructor() {
        this.connectWithRetry();
    }

    getInstance() {
        return mongoose;
    }

    connectWithRetry() {
        log('process.env.MONGODB_URI', process.env.MONGODB_URI);
        const MONGODB_URI = process.env.MONGODB_URI || '';
        log('Connecting to MongoDB(Retry when failed)');
        mongoose
            .connect(MONGODB_URI, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    }
}

export default new MongooseService(); */

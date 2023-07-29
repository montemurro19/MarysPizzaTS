import mongoose from 'mongoose';
import config from '../config';
import logs from './logs';

class Database {
    connect() {
        try {
            mongoose.connect(config.mongo);
            logs.info('database', 'mongo is connected');
        } catch (e) {
            logs.error('database', 'mongo isnt connected');
        }
    }

    isConnected(): boolean {
        const isConnected = mongoose.connection.readyState;
        return isConnected === 1;
    }
}

export default new Database();

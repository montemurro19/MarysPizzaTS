import mongoose from 'mongoose';
import config from './config';

export default class Mongo {
    async connect() {
        await mongoose
            .connect(config.mongo)
            .then(() => {
                console.log('db conn');
            })
            .catch((err) => {
                console.log('deu ruim', err);
            });
    }

    isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }
}

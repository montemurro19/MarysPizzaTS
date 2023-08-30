import { IUser } from './User/user.model';
import Mongo from './Common/mongo.connection';
import Server from './server';

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

const server = new Server();
const db = new Mongo();

server.start();
db.connect();
